"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { cards as builtInCards, type Card } from "./vocabulary";

type Status = "new" | "review" | "learned";

const emptyProgress = Object.fromEntries(builtInCards.map((card) => [card.id, { status: "new" as Status, streak: 0 }]));

export default function Home() {
  const [progress, setProgress] = useState<Record<string, { status: Status; streak: number }>>(emptyProgress);
  const [seenCards, setSeenCards] = useState<string[]>([]);
  const [lifetimeResults, setLifetimeResults] = useState<Record<string, "review" | "correct">>({});
  const [customCards, setCustomCards] = useState<Card[]>([]);
  const [category, setCategory] = useState("All");
  const [direction, setDirection] = useState<"de-en" | "en-de">("de-en");
  const [drawMode, setDrawMode] = useState<"random" | "alphabetical">("random");
  const [filter, setFilter] = useState<Status | "all">("all");
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [ready, setReady] = useState(false);
  const [adding, setAdding] = useState(false);
  const [newGerman, setNewGerman] = useState("");
  const [newEnglish, setNewEnglish] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newCategory, setNewCategory] = useState("My words");
  const [managingWords, setManagingWords] = useState(false);
  const [editingWord, setEditingWord] = useState<string | null>(null);
  const [wordSearch, setWordSearch] = useState("");
  const [wordCategoryFilter, setWordCategoryFilter] = useState("All");
  const [wordSort, setWordSort] = useState<"newest" | "az">("newest");
  const [savedSession, setSavedSession] = useState<{ gameIds: string[]; baseIds: string[]; marks: Record<string, "review" | "correct"> } | null>(null);
  const [showCatalog, setShowCatalog] = useState(false);
  const [catalogSearch, setCatalogSearch] = useState("");
  const [openCatalogCategories, setOpenCatalogCategories] = useState<string[]>([]);
  const [catalogSelection, setCatalogSelection] = useState<string[]>([]);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const cards = useMemo(() => [...builtInCards, ...customCards], [customCards]);
  const categories = useMemo(() => [...new Set(cards.map((item) => item.category))], [cards]);
  const [gameSetup, setGameSetup] = useState(false);
  const [gameCount, setGameCount] = useState(200);
  const [gameScope, setGameScope] = useState<"unseen" | "all">("unseen");
  const [gameCategories, setGameCategories] = useState<string[]>([]);
  const [gameCards, setGameCards] = useState<Card[] | null>(null);
  const [baseGameCards, setBaseGameCards] = useState<Card[] | null>(null);
  const [sessionMarks, setSessionMarks] = useState<Record<string, "review" | "correct">>({});
  const activeCards = gameCards ?? cards;

  useEffect(() => {
    const saved = localStorage.getItem("wortpool-progress-v1");
    if (saved) setProgress((base) => ({ ...base, ...JSON.parse(saved) }));
    const savedCustom = localStorage.getItem("woertersee-custom-cards-v1");
    if (savedCustom) setCustomCards(JSON.parse(savedCustom));
    const savedSeen = localStorage.getItem("woertersee-seen-cards-v1");
    if (savedSeen) setSeenCards(JSON.parse(savedSeen));
    const savedResults = localStorage.getItem("woertersee-lifetime-results-v1");
    if (savedResults) setLifetimeResults(JSON.parse(savedResults));
    const activeSession = localStorage.getItem("woertersee-active-session-v1");
    if (activeSession) setSavedSession(JSON.parse(activeSession));
    setCurrent(Math.floor(Math.random() * builtInCards.length));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("wortpool-progress-v1", JSON.stringify(progress));
  }, [progress, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("woertersee-custom-cards-v1", JSON.stringify(customCards));
  }, [customCards, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("woertersee-seen-cards-v1", JSON.stringify(seenCards));
  }, [seenCards, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("woertersee-lifetime-results-v1", JSON.stringify(lifetimeResults));
  }, [lifetimeResults, ready]);

  useEffect(() => {
    if (!ready) return;
    if (gameCards) localStorage.setItem("woertersee-active-session-v1", JSON.stringify({ gameIds: gameCards.map((item) => item.id), baseIds: (baseGameCards ?? gameCards).map((item) => item.id), marks: sessionMarks }));
    else localStorage.removeItem("woertersee-active-session-v1");
  }, [ready, gameCards, baseGameCards, sessionMarks]);

  const visible = useMemo(() => {
    const result = activeCards.filter((card) =>
      (category === "All" || card.category === category) &&
      (filter === "all" || progress[card.id]?.status === filter) &&
      (!gameCards || !sessionMarks[card.id])
    );
    return drawMode === "alphabetical" ? [...result].sort((a, b) => a.de.localeCompare(b.de, "de")) : result;
  }, [activeCards, category, filter, progress, drawMode, gameCards, sessionMarks]);
  const card = ready ? visible[current % Math.max(visible.length, 1)] : undefined;
  const counts = cards.reduce((acc, item) => { acc[progress[item.id]?.status ?? "new"]++; return acc; }, { new: 0, review: 0, learned: 0 });

  function advance() {
    setFlipped(false);
    setCurrent((value) => {
      if (visible.length < 2) return 0;
      if (drawMode === "alphabetical") return (value + 1) % visible.length;
      let next = value;
      while (next === value) next = Math.floor(Math.random() * visible.length);
      return next;
    });
  }

  function resetDraw(nextCategory = category, nextFilter = filter, nextMode = drawMode) {
    const poolSize = cards.filter((item) =>
      (nextCategory === "All" || item.category === nextCategory) &&
      (nextFilter === "all" || progress[item.id]?.status === nextFilter)
    ).length;
    setCurrent(nextMode === "random" && poolSize ? Math.floor(Math.random() * poolSize) : 0);
    setFlipped(false);
  }

  function mark(known: boolean) {
    if (!card) return;
    setSeenCards((items) => items.includes(card.id) ? items : [...items, card.id]);
    setLifetimeResults((items) => ({ ...items, [card.id]: known ? "correct" : "review" }));
    setSessionMarks((items) => ({ ...items, [card.id]: known ? "correct" : "review" }));
    setProgress((prev) => {
      const old = prev[card.id] ?? { status: "new" as Status, streak: 0 };
      const streak = known ? old.streak + 1 : 0;
      return { ...prev, [card.id]: { streak, status: known && streak >= 3 ? "learned" : "review" } };
    });
    setCurrent(0);
    setFlipped(false);
  }

  function shuffle() {
    if (visible.length < 2) return;
    let next = current;
    while (next === current) next = Math.floor(Math.random() * visible.length);
    setCurrent(next);
    setFlipped(false);
  }

  function addCustomCard(event: FormEvent) {
    event.preventDefault();
    const de = newGerman.trim();
    const en = newEnglish.trim();
    if (!de || !en) return;
    const id = `custom-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const next: Card = { id, de, en, category: newCategory, detail: newNote.trim() || undefined };
    setCustomCards((items) => [...items, next]);
    setProgress((items) => ({ ...items, [id]: { status: "new", streak: 0 } }));
    setNewGerman("");
    setNewEnglish("");
    setNewNote("");
    setAdding(false);
    setCategory(newCategory);
    setFilter("all");
    setCurrent(customCards.length);
    setFlipped(false);
  }

  function removeCustomCard(id: string) {
    setCustomCards((items) => items.filter((item) => item.id !== id));
    setProgress((items) => {
      const next = { ...items };
      delete next[id];
      return next;
    });
    setCurrent(0);
    setFlipped(false);
  }

  function updateCustomCard(id: string, field: "de" | "en" | "category" | "detail", value: string) {
    setCustomCards((items) => items.map((item) => item.id === id ? { ...item, [field]: value } : item));
  }

  function toggleGameCategory(item: string) {
    setGameCategories((items) => items.includes(item) ? items.filter((value) => value !== item) : [...items, item]);
  }

  function shuffled<T>(items: T[]) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  function startCustomGame() {
    const selected = gameCategories.length ? gameCategories : categories;
    const eligibleCards = gameScope === "unseen" ? cards.filter((item) => !seenCards.includes(item.id)) : cards;
    const pools = selected.map((name) => shuffled(eligibleCards.filter((item) => item.category === name))).filter((pool) => pool.length);
    const target = Math.min(Math.max(1, gameCount), pools.reduce((sum, pool) => sum + pool.length, 0));
    const chosen: Card[] = [];
    let round = 0;
    while (chosen.length < target && pools.some((pool) => round < pool.length)) {
      for (const pool of pools) {
        if (chosen.length < target && round < pool.length) chosen.push(pool[round]);
      }
      round++;
    }
    const deck = shuffled(chosen);
    setGameCards(deck);
    setBaseGameCards(deck);
    setSessionMarks({});
    setGameSetup(false);
    setCategory("All");
    setFilter("all");
    setDrawMode("random");
    setCurrent(0);
    setFlipped(false);
  }

  function startQuickGame(count = 50) {
    setGameCount(count);
    setGameCategories(categories);
    const chosen = shuffled(cards).slice(0, Math.min(count, cards.length));
    setGameCards(chosen);
    setBaseGameCards(chosen);
    setSessionMarks({});
    setCategory("All");
    setFilter("all");
    setDrawMode("random");
    setCurrent(0);
    setFlipped(false);
  }

  function startDifficultGame() {
    const difficult = shuffled(cards.filter((item) => lifetimeResults[item.id] === "review"));
    if (!difficult.length) return;
    setGameCards(difficult);
    setBaseGameCards(difficult);
    setSessionMarks({});
    setCategory("All");
    setFilter("all");
    setDrawMode("random");
    setCurrent(0);
    setFlipped(false);
  }

  function startUnseenGame(count = 50) {
    const unseen = shuffled(cards.filter((item) => !seenCards.includes(item.id))).slice(0, count);
    if (!unseen.length) return;
    setGameCards(unseen); setBaseGameCards(unseen); setSessionMarks({}); setCategory("All"); setFilter("all"); setDrawMode("random"); setCurrent(0); setFlipped(false);
  }

  function startMixedGame(count = 50) {
    startQuickGame(count);
  }

  function resumeSavedGame() {
    if (!savedSession) return;
    const lookup = new Map(cards.map((item) => [item.id, item]));
    const game = savedSession.gameIds.map((id) => lookup.get(id)).filter(Boolean) as Card[];
    const base = savedSession.baseIds.map((id) => lookup.get(id)).filter(Boolean) as Card[];
    if (!game.length) return;
    setGameCards(game); setBaseGameCards(base.length ? base : game); setSessionMarks(savedSession.marks); setCategory("All"); setFilter("all"); setCurrent(0); setFlipped(false);
  }

  function exportMyWords() {
    const rows = [["German","English","Category","Note"], ...customCards.map((item) => [item.de,item.en,item.category,item.detail ?? ""])];
    const csv = rows.map((row) => row.map((cell) => `"${cell.replaceAll('"','""')}"`).join(",")).join("\n");
    const link = document.createElement("a"); link.href = URL.createObjectURL(new Blob([csv], { type:"text/csv" })); link.download = "woertersee-my-words.csv"; link.click(); URL.revokeObjectURL(link.href);
  }

  function importMyWords(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]; if (!file) return;
    file.text().then((text) => {
      const lines = text.split(/\r?\n/).slice(1).filter(Boolean);
      const imported = lines.map((line, index) => { const values = [...line.matchAll(/"((?:[^"]|"")*)"(?:,|$)/g)].map((match) => match[1].replaceAll('""','"')); return { id:`custom-${Date.now()}-${index}`, de:values[0]?.trim(), en:values[1]?.trim(), category:values[2]?.trim() || "My words", detail:values[3]?.trim() || undefined } as Card; }).filter((item) => item.de && item.en);
      setCustomCards((items) => [...items, ...imported]);
    }); event.target.value = "";
  }

  const displayedCustomCards = [...customCards].filter((item) => (wordCategoryFilter === "All" || item.category === wordCategoryFilter) && `${item.de} ${item.en} ${item.detail ?? ""}`.toLowerCase().includes(wordSearch.toLowerCase())).sort((a,b) => wordSort === "az" ? a.de.localeCompare(b.de,"de") : b.id.localeCompare(a.id));
  const catalogCards = cards.filter((item) => `${item.de} ${item.en} ${item.detail ?? ""} ${item.category}`.toLowerCase().includes(catalogSearch.toLowerCase()));

  function toggleCatalogCategory(name: string) {
    setOpenCatalogCategories((items) => items.includes(name) ? items.filter((item) => item !== name) : [...items, name]);
  }

  function toggleCatalogCard(id: string) {
    setCatalogSelection((items) => items.includes(id) ? items.filter((item) => item !== id) : [...items, id]);
  }

  function toggleCatalogGroup(items: Card[]) {
    const ids = items.map((item) => item.id);
    const allSelected = ids.every((id) => catalogSelection.includes(id));
    setCatalogSelection((selected) => allSelected ? selected.filter((id) => !ids.includes(id)) : [...new Set([...selected, ...ids])]);
  }

  function startCatalogGame() {
    const selected = shuffled(cards.filter((item) => catalogSelection.includes(item.id)));
    if (!selected.length) return;
    setGameCards(selected); setBaseGameCards(selected); setSessionMarks({}); setCategory("All"); setFilter("all"); setDrawMode("random"); setCurrent(0); setFlipped(false); setShowCatalog(false);
  }

  const sessionReview = Object.values(sessionMarks).filter((value) => value === "review").length;
  const sessionCorrect = Object.values(sessionMarks).filter((value) => value === "correct").length;
  const sessionDone = Object.keys(sessionMarks).length;
  const lifetimeCorrect = Object.values(lifetimeResults).filter((value) => value === "correct").length;
  const lifetimeReview = Object.values(lifetimeResults).filter((value) => value === "review").length;
  const lifetimeSeen = Object.keys(lifetimeResults).length;
  const sessionMistakes = gameCards?.filter((item) => sessionMarks[item.id] === "review") ?? [];
  const sessionCategories = gameCards ? [...new Set(gameCards.filter((item) => sessionMarks[item.id]).map((item) => item.category))].map((name) => { const items = gameCards.filter((item) => item.category === name && sessionMarks[item.id]); return { name, correct: items.filter((item) => sessionMarks[item.id] === "correct").length, total: items.length }; }) : [];

  function restartDeck(onlyMistakes = false) {
    if (!gameCards) return;
    const nextCards = onlyMistakes
      ? gameCards.filter((item) => sessionMarks[item.id] === "review")
      : (baseGameCards ?? gameCards);
    setGameCards(shuffled(nextCards));
    setSessionMarks({});
    setCategory("All");
    setFilter("all");
    setDrawMode("random");
    setCurrent(0);
    setFlipped(false);
  }

  function finishGameEarly() {
    if (!gameCards || !sessionDone) return;
    const completedDeck = gameCards.filter((item) => sessionMarks[item.id]);
    setGameCards(completedDeck);
    setBaseGameCards(completedDeck);
    setCategory("All");
    setFilter("all");
    setCurrent(0);
    setFlipped(false);
  }

  function resetSeenHistory() {
    const confirmed = window.confirm("Are you sure? This will mark every word as unseen again. Your learned and review pools will not be changed.");
    if (!confirmed) return;
    setSeenCards([]);
  }

  function goHome() {
    setGameCards(null);
    setBaseGameCards(null);
    setSavedSession(null);
    setSessionMarks({});
    setCurrent(0);
    setFlipped(false);
    localStorage.removeItem("woertersee-active-session-v1");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!gameCards) return (
    <main>
      <header className="topbar"><button className="brand" type="button" onClick={goHome} aria-label="Go to home page">Worter<span>See</span></button><div className="headerActions"><button onClick={() => setShowInstallHelp(true)}>Install app</button><div className="session"><span className="pulse" /> Your vocabulary lake <strong>{cards.length}</strong> cards</div></div></header>
      {showInstallHelp && <div className="installOverlay" onClick={() => setShowInstallHelp(false)}><section className="installCard" onClick={(event) => event.stopPropagation()}><button onClick={() => setShowInstallHelp(false)}>×</button><img src="./woertersee-icon.svg" alt="WorterSee app icon"/><p className="eyebrow">INSTALL ON IPHONE</p><h2>Add WorterSee to your Home Screen</h2><ol><li>Open this page in <b>Safari</b>.</li><li>Tap the <b>Share</b> button at the bottom.</li><li>Choose <b>Add to Home Screen</b>.</li><li>Tap <b>Add</b>. WorterSee will open like an app.</li></ol><p>Your words and progress stay on this iPhone. The app can reopen without an internet connection after its first load.</p></section></div>}
      <section className="landingHero">
        <p className="eyebrow">GERMAN VOCABULARY GAME</p>
        <h1>Choose your next<br/><em>study session.</em></h1>
        <p className="intro">Start immediately with a balanced random deck, or create a focused game from the categories you want to practise.</p>
      </section>
      {savedSession && <section className="resumeBanner"><div><b>Continue your game</b><span>{Object.keys(savedSession.marks).length} of {savedSession.gameIds.length} cards completed</span></div><button onClick={resumeSavedGame}>Continue</button><button className="discard" onClick={() => { localStorage.removeItem("woertersee-active-session-v1"); setSavedSession(null); }}>Discard</button></section>}
      <section className="startOptions">
        <article className="quickStartCard">
          <span className="optionNumber">01</span><p className="eyebrow">QUICK START</p>
          <h2>Choose a purpose.</h2><p>Continue with new words, practise difficult ones, or mix the complete lake.</p>
          <div className="purposeStarts"><button disabled={!cards.some((item) => !seenCards.includes(item.id))} onClick={() => startUnseenGame(50)}><b>Continue unseen</b><span>{cards.filter((item) => !seenCards.includes(item.id)).length} available</span></button><button disabled={!lifetimeReview} onClick={startDifficultGame}><b>Review difficult</b><span>{lifetimeReview} available</span></button><button onClick={() => startMixedGame(50)}><b>Mixed practice</b><span>50 cards</span></button></div>
        </article>
        <article className="customStartCard">
          <span className="optionNumber">02</span><p className="eyebrow">BUILD A GAME</p>
          <h2>Make it your own.</h2><p>Set your deck size and choose exactly which categories should be included.</p>
          <div className="scopeChoice"><button className={gameScope === "unseen" ? "active" : ""} onClick={() => setGameScope("unseen")}><b>Unseen only</b><small>Words you have never answered</small></button><button className={gameScope === "all" ? "active" : ""} onClick={() => setGameScope("all")}><b>All words</b><small>Include previously played words</small></button></div>
          <button className="resetUnseen" disabled={!seenCards.length} onClick={resetSeenHistory}>Reset unseen history · {seenCards.length} seen words</button>
          <label className="countLabel">Number of cards<input type="number" min="1" max={cards.length} value={gameCount} onChange={(e) => setGameCount(Number(e.target.value))} /></label>
          <div className="quickCounts">{[50,100,200,300].map((count) => <button key={count} className={gameCount === count ? "active" : ""} onClick={() => setGameCount(count)}>{count}</button>)}</div>
          <div className="categoryHeading"><b>Categories</b><button onClick={() => setGameCategories(gameCategories.length === categories.length ? [] : categories)}>{gameCategories.length === categories.length ? "Clear all" : "Select all"}</button></div>
          <div className="categoryGrid landingCategories">{categories.map((item) => <label key={item} className={gameCategories.includes(item) ? "selected" : ""}><input type="checkbox" checked={gameCategories.includes(item)} onChange={() => toggleGameCategory(item)} /><span>{item}</span><small>{cards.filter((card) => card.category === item && (gameScope === "all" || !seenCards.includes(card.id))).length}</small></label>)}</div>
          <button className="startGame" disabled={!gameCategories.length || gameCount < 1 || !cards.some((item) => gameCategories.includes(item.category) && (gameScope === "all" || !seenCards.includes(item.id)))} onClick={startCustomGame}>Start balanced game · {Math.min(gameCount || 0, cards.filter((item) => gameCategories.includes(item.category) && (gameScope === "all" || !seenCards.includes(item.id))).length)} cards</button>
        </article>
        <article className="pickWordsCard">
          <span className="optionNumber">03</span><p className="eyebrow">PICK YOUR WORDS</p>
          <h2>Choose exact cards.</h2><p>Browse the complete word lake, search by German or English, and select individual cards or whole categories.</p>
          <div className="pickWordsSummary"><span><b>{cards.length}</b><small>Words available</small></span><span><b>{catalogSelection.length}</b><small>Selected</small></span></div>
          <button className="openCatalog" onClick={() => { setShowCatalog(true); requestAnimationFrame(() => document.getElementById("word-catalog")?.scrollIntoView({ behavior: "smooth" })); }}>Browse and pick words →</button>
        </article>
      </section>
      {showCatalog && <section id="word-catalog" className="wordCatalog"><div className="catalogHeader"><div><p className="eyebrow">PICK YOUR WORDS</p><h2>Choose from all {cards.length} words.</h2><small>Select whole categories or individual cards to create your exact game.</small></div><div className="catalogHeaderTools"><input value={catalogSearch} onChange={(e) => setCatalogSearch(e.target.value)} placeholder="Search German, English or category" /><button onClick={() => setShowCatalog(false)}>Close</button></div></div><div className="catalogSelectionBar"><span><b>{catalogSelection.length}</b> words selected</span><button disabled={!catalogCards.length} onClick={() => setCatalogSelection((selected) => [...new Set([...selected, ...catalogCards.map((item) => item.id)])])}>Select all visible</button><button disabled={!catalogSelection.length} onClick={() => setCatalogSelection([])}>Clear</button><button className="playSelection" disabled={!catalogSelection.length} onClick={startCatalogGame}>Start game · {catalogSelection.length}</button></div><div className="catalogCategories">{categories.map((name) => { const items = catalogCards.filter((item) => item.category === name); if (!items.length) return null; const open = openCatalogCategories.includes(name) || Boolean(catalogSearch); const selectedCount = items.filter((item) => catalogSelection.includes(item.id)).length; return <article key={name}><div className="catalogCategoryHead"><button onClick={() => toggleCatalogCategory(name)}><span><b>{name}</b><small>{items.length} words · {selectedCount} selected</small></span><i>{open ? "−" : "+"}</i></button><button className="selectGroup" onClick={() => toggleCatalogGroup(items)}>{selectedCount === items.length ? "Deselect group" : "Select group"}</button></div>{open && <div className="catalogWords">{items.slice().sort((a,b) => a.de.localeCompare(b.de,"de")).map((item) => <label key={item.id} className={catalogSelection.includes(item.id) ? "selected" : ""}><input type="checkbox" checked={catalogSelection.includes(item.id)} onChange={() => toggleCatalogCard(item.id)}/><span><b>{item.de}</b><small>{item.detail}</small></span><span>{item.en}</span></label>)}</div>}</article>; })}</div></section>}
      <section className="lifetimeScore">
        <div><p className="eyebrow">LIFETIME SCORE</p><h2>Your unique-word progress.</h2><p>Each word is counted once according to your most recent answer.</p></div>
        <div className="lifetimeNumbers"><span><b>{lifetimeSeen}</b><small>Unique played</small></span><span><b>{lifetimeCorrect}</b><small>Known</small></span><span><b>{lifetimeReview}</b><small>Difficult</small></span></div>
        <button disabled={!lifetimeReview} onClick={startDifficultGame}>Practise difficult words · {lifetimeReview}</button>
      </section>
      <section className="addWordLanding">
        <div><p className="eyebrow">PERSONAL VOCABULARY</p><h2>Add your own word.</h2><p>Save a German–English card directly to one of the category pools. It stays on this device.</p></div>
        <button className="addWordButton" onClick={() => setAdding((value) => !value)}>{adding ? "× Close" : "+ Add my word"}</button>
        {adding && <form className="addForm landingAddForm" onSubmit={addCustomCard}>
          <label>German<input value={newGerman} onChange={(e) => setNewGerman(e.target.value)} placeholder="e.g. die Aussicht" autoFocus required /></label>
          <label>English<input value={newEnglish} onChange={(e) => setNewEnglish(e.target.value)} placeholder="e.g. prospect" required /></label>
          <label>Category<select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}><option>My words</option>{[...new Set(builtInCards.map((item) => item.category))].map((item) => <option key={item}>{item}</option>)}</select></label>
          <label>Note <small>optional</small><input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Grammar or example" /></label>
          <button type="submit">Add to my pool</button><p>Saved only in this browser.</p>
        </form>}
      </section>
      <section className="myWordsSection">
        <button className="myWordsToggle" onClick={() => setManagingWords((value) => !value)}><span><b>My Words</b><small>View and edit your personal vocabulary</small></span><strong>{customCards.length}</strong><i>{managingWords ? "−" : "+"}</i></button>
        {managingWords && <div className="myWordsPanel"><div className="wordTools"><input value={wordSearch} onChange={(e) => setWordSearch(e.target.value)} placeholder="Search my words"/><select value={wordCategoryFilter} onChange={(e) => setWordCategoryFilter(e.target.value)}><option>All</option>{[...new Set(customCards.map((item) => item.category))].map((name) => <option key={name}>{name}</option>)}</select><select value={wordSort} onChange={(e) => setWordSort(e.target.value as "newest"|"az")}><option value="newest">Newest first</option><option value="az">A–Z</option></select><button onClick={exportMyWords} disabled={!customCards.length}>Export CSV</button><label className="importCsv">Import CSV<input type="file" accept=".csv,text/csv" onChange={importMyWords}/></label></div>
          {!displayedCustomCards.length ? <div className="noPersonalWords"><b>No matching personal words.</b><span>Use “Add my word” above or change your filters.</span></div> : displayedCustomCards.map((item) => <article className="personalWord" key={item.id}>
            {editingWord === item.id ? <div className="wordEditGrid">
              <label>German<input value={item.de} onChange={(e) => updateCustomCard(item.id, "de", e.target.value)} /></label>
              <label>English<input value={item.en} onChange={(e) => updateCustomCard(item.id, "en", e.target.value)} /></label>
              <label>Category<select value={item.category} onChange={(e) => updateCustomCard(item.id, "category", e.target.value)}><option>My words</option>{[...new Set(builtInCards.map((card) => card.category))].map((name) => <option key={name}>{name}</option>)}</select></label>
              <label>Note<input value={item.detail ?? ""} onChange={(e) => updateCustomCard(item.id, "detail", e.target.value)} /></label>
            </div> : <div className="wordSummary"><span><b>{item.de}</b><small>{item.category}</small></span><span><b>{item.en}</b>{item.detail && <small>{item.detail}</small>}</span></div>}
            <div className="wordManagerActions"><button onClick={() => setEditingWord(editingWord === item.id ? null : item.id)}>{editingWord === item.id ? "Done" : "Edit"}</button><button className="deleteWord" onClick={() => { removeCustomCard(item.id); if (editingWord === item.id) setEditingWord(null); }}>Delete</button></div>
          </article>)}
        </div>}
      </section>
      <section className="progressSettings"><details><summary>Progress settings</summary><div><button disabled={!seenCards.length} onClick={resetSeenHistory}>Reset unseen history</button><button disabled={!Object.keys(lifetimeResults).length} onClick={() => { if (window.confirm("Reset Known and Difficult progress? Your personal words will stay.")) { setLifetimeResults({}); setProgress(emptyProgress); } }}>Reset learning progress</button><button className="danger" onClick={() => { if (window.confirm("Reset all progress and unseen history? Your personal words will stay.")) { setSeenCards([]); setLifetimeResults({}); setProgress(emptyProgress); localStorage.removeItem("woertersee-active-session-v1"); setSavedSession(null); } }}>Reset all progress</button></div></details></section>
      <section className="landingFooter"><div><b>{cards.length}</b><span>Total words</span></div><div><b>{categories.length}</b><span>Categories</span></div><div><b>{customCards.length}</b><span>My words</span></div><p>Your progress and personal words stay saved in this browser.</p></section>
    </main>
  );

  return (
    <main>
      <header className="topbar">
        <button className="brand" type="button" onClick={goHome} aria-label="Go to home page">Worter<span>See</span></button>
        <div className="headerActions"><button className="endGame" onClick={() => { setGameCards(null); setBaseGameCards(null); setSavedSession(null); setCurrent(0); setSessionMarks({}); }}>← Exit game</button><div className="session"><span className="pulse" /> Game progress <strong>{sessionDone}</strong> / {gameCards.length}</div></div>
      </header>

      {gameSetup && <div className="gameOverlay" onClick={() => setGameSetup(false)}>
        <section className="gameBuilder" onClick={(event) => event.stopPropagation()}>
          <button className="closeBuilder" onClick={() => setGameSetup(false)}>×</button>
          <p className="eyebrow">CUSTOM GAME</p><h2>Build your study pool</h2>
          <p>Choose the number of cards and the categories. Cards are distributed as evenly as possible across your selection.</p>
          <label className="countLabel">Number of cards<input type="number" min="1" max={cards.length} value={gameCount} onChange={(e) => setGameCount(Number(e.target.value))} /></label>
          <div className="quickCounts">{[50,100,200,300].map((count) => <button key={count} className={gameCount === count ? "active" : ""} onClick={() => setGameCount(count)}>{count}</button>)}</div>
          <div className="categoryHeading"><b>Categories</b><button onClick={() => setGameCategories(gameCategories.length === categories.length ? [] : categories)}>{gameCategories.length === categories.length ? "Clear all" : "Select all"}</button></div>
          <div className="categoryGrid">{categories.map((item) => <label key={item} className={gameCategories.includes(item) ? "selected" : ""}><input type="checkbox" checked={gameCategories.includes(item)} onChange={() => toggleGameCategory(item)} /><span>{item}</span><small>{cards.filter((card) => card.category === item && (gameScope === "all" || !seenCards.includes(card.id))).length}</small></label>)}</div>
          <button className="startGame" disabled={!gameCategories.length || gameCount < 1} onClick={startCustomGame}>Start balanced game · {Math.min(gameCount || 0, cards.filter((item) => gameCategories.includes(item.category)).length)} cards</button>
        </section>
      </div>}

      <section className="hero">
        <div>
          <p className="eyebrow">GERMAN VOCABULARY GAME</p>
          <h1>Flip. Recall.<br/><em>Grow your pool.</em></h1>
          <p className="intro">Flip a card and check your answer. Difficult words stay ready for focused practice; three correct answers mark a word as known.</p>
        </div>
        <div className="stats sessionStats">
          <button><b>{gameCards.length}</b><span>Deck</span></button>
          <button><b>{sessionReview}</b><span>Review pool</span></button>
          <button><b>{sessionCorrect}</b><span>Got it</span></button>
        </div>
      </section>

      <section className="gameProgress" aria-label="Game progress"><div style={{width:`${Math.round((sessionDone / Math.max(gameCards.length,1))*100)}%`}} /><span>{Math.round((sessionDone / Math.max(gameCards.length,1))*100)}% complete</span></section>

      <section className="workspace">
        <div className="controls">
          <div className="segmented"><button className={direction === "de-en" ? "active" : ""} onClick={() => setDirection("de-en")}>DE → EN</button><button className={direction === "en-de" ? "active" : ""} onClick={() => setDirection("en-de")}>EN → DE</button></div>
          <div className="segmented mode"><button className={drawMode === "random" ? "active" : ""} onClick={() => { setDrawMode("random"); resetDraw(category, filter, "random"); }}>↝ Random</button><button className={drawMode === "alphabetical" ? "active" : ""} onClick={() => { setDrawMode("alphabetical"); resetDraw(category, filter, "alphabetical"); }}>A–Z</button></div>
          {drawMode === "random" && <button className="drawAnother" onClick={shuffle}>↝ Draw another</button>}
        </div>

        {card ? <>
          <button className={`card ${flipped ? "flipped" : ""}`} onClick={() => setFlipped(!flipped)} aria-label="Flip card">
            <div className="cardTop"><span>{card.category}</span><small>{progress[card.id]?.streak ?? 0}/3 correct</small></div>
            <div className="word">
              <small>{flipped ? "ANSWER" : direction === "de-en" ? "GERMAN" : "ENGLISH"}</small>
              <h2>{flipped ? (direction === "de-en" ? card.en : card.de) : (direction === "de-en" ? card.de : card.en)}</h2>
              {flipped && card.detail && <p>{card.detail}</p>}
              {flipped && card.example && <blockquote>“{card.example}”</blockquote>}
              {flipped && card.id.startsWith("custom-") && <span className="removeWord" role="button" tabIndex={0} onClick={(event) => { event.stopPropagation(); removeCustomCard(card.id); }} onKeyDown={(event) => { if (event.key === "Enter") removeCustomCard(card.id); }}>Remove this word</span>}
            </div>
            <div className="flipHint">{flipped ? "Tap to flip back" : "Tap to reveal the answer"} <span>↻</span></div>
          </button>
          <div className="actions">
            <button className="miss" disabled={!flipped} onClick={() => mark(false)}><span>×</span><div><b>Not yet</b><small>Mark as difficult</small></div></button>
            <button className="know" disabled={!flipped} onClick={() => mark(true)}><span>✓</span><div><b>Got it</b><small>{Math.min((progress[card.id]?.streak ?? 0) + 1, 3)}/3 toward known</small></div></button>
          </div>
          <button className="finishGameBelow" disabled={!sessionDone || sessionDone === gameCards.length} onClick={finishGameEarly}>Finish game and see results · {sessionDone} cards completed</button>
        </> : sessionDone === gameCards.length ? <div className="gameComplete">
          <p className="eyebrow">SESSION COMPLETE</p><h2>{sessionDone ? Math.round((sessionCorrect/sessionDone)*100) : 0}% correct.</h2>
          <p>Your results include every card completed in this session.</p>
          <div><span><b>{gameCards.length}</b><small>Cards</small></span><span><b>{sessionCorrect}</b><small>Got it</small></span><span><b>{sessionReview}</b><small>Review</small></span></div>
          <section className="resultLifetime"><b>Lifetime unique score</b><span>{lifetimeCorrect} known · {lifetimeReview} difficult · {lifetimeSeen} played</span></section>
          {sessionMistakes.length > 0 && <section className="mistakeList"><b>Words to revisit</b><div>{sessionMistakes.map((item) => <span key={item.id}><strong>{item.de}</strong><small>{item.en}</small></span>)}</div></section>}
          {sessionCategories.length > 1 && <section className="categoryResults"><b>By category</b>{sessionCategories.map((item) => <span key={item.name}>{item.name}<small>{item.correct}/{item.total}</small></span>)}</section>}
          <div className="completeActions">
            {sessionReview > 0 && <button className="reviewMistakes" onClick={() => restartDeck(true)}>Review my mistakes · {sessionReview}</button>}
            <button className="replayDeck" onClick={() => restartDeck(false)}>Play original deck again · {baseGameCards?.length ?? gameCards.length}</button>
            <button className="backHome" onClick={() => { setGameCards(null); setBaseGameCards(null); setSavedSession(null); setSessionMarks({}); setCurrent(0); }}>Back to home</button>
          </div>
        </div> : <div className="empty"><b>This game is complete.</b><p>You have answered every card in this deck.</p></div>}
      </section>
      <footer><span>Complete deck · {cards.length} cards · Random by default</span><span>Choose A–Z for alphabetical order. Progress is saved on this device.</span></footer>
    </main>
  );
}
