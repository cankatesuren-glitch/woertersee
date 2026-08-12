"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { cards as builtInCards, type Card } from "./vocabulary";

type Status = "new" | "review" | "learned";

const emptyProgress = Object.fromEntries(builtInCards.map((card) => [card.id, { status: "new" as Status, streak: 0 }]));

export default function Home() {
  const [progress, setProgress] = useState<Record<string, { status: Status; streak: number }>>(emptyProgress);
  const [seenCards, setSeenCards] = useState<string[]>([]);
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

  const sessionReview = Object.values(sessionMarks).filter((value) => value === "review").length;
  const sessionCorrect = Object.values(sessionMarks).filter((value) => value === "correct").length;
  const sessionDone = Object.keys(sessionMarks).length;

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

  if (!gameCards) return (
    <main>
      <header className="topbar"><a className="brand" href="#">Wörter<span>see</span></a><div className="session"><span className="pulse" /> Your vocabulary lake <strong>{cards.length}</strong> cards</div></header>
      <section className="landingHero">
        <p className="eyebrow">GERMAN VOCABULARY GAME</p>
        <h1>Choose your next<br/><em>study session.</em></h1>
        <p className="intro">Start immediately with a balanced random deck, or create a focused game from the categories you want to practise.</p>
      </section>
      <section className="startOptions">
        <article className="quickStartCard">
          <span className="optionNumber">01</span><p className="eyebrow">QUICK START</p>
          <h2>Jump into the lake.</h2><p>Draw a balanced random selection from the complete vocabulary pool.</p>
          <div className="landingCounts">{[25,50,100,200].map((count) => <button key={count} onClick={() => startQuickGame(count)}><b>{count}</b><span>cards</span></button>)}</div>
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
        {managingWords && <div className="myWordsPanel">
          {!customCards.length ? <div className="noPersonalWords"><b>No personal words yet.</b><span>Use “Add my word” above to create your first card.</span></div> : customCards.map((item) => <article className="personalWord" key={item.id}>
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
      <section className="landingFooter"><div><b>{cards.length}</b><span>Total words</span></div><div><b>{categories.length}</b><span>Categories</span></div><div><b>{customCards.length}</b><span>My words</span></div><p>Your progress and personal words stay saved in this browser.</p></section>
    </main>
  );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">Wörter<span>see</span></a>
        <div className="headerActions"><button className="endGame" onClick={() => { setGameCards(null); setBaseGameCards(null); setCurrent(0); setSessionMarks({}); }}>← Exit game</button><div className="session"><span className="pulse" /> Game progress <strong>{sessionDone}</strong> / {gameCards.length}</div></div>
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
          <p className="intro">Flip a card and check your answer. Difficult words return to your review pool; mastered words move to your learned pool.</p>
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
          <label>Category<select value={category} onChange={(e) => { setCategory(e.target.value); resetDraw(e.target.value); }}><option>All</option>{[...new Set(activeCards.map(c => c.category))].map(c => <option key={c}>{c}</option>)}</select></label>
          <div className="segmented"><button className={direction === "de-en" ? "active" : ""} onClick={() => setDirection("de-en")}>DE → EN</button><button className={direction === "en-de" ? "active" : ""} onClick={() => setDirection("en-de")}>EN → DE</button></div>
          <div className="segmented mode"><button className={drawMode === "random" ? "active" : ""} onClick={() => { setDrawMode("random"); resetDraw(category, filter, "random"); }}>↝ Random</button><button className={drawMode === "alphabetical" ? "active" : ""} onClick={() => { setDrawMode("alphabetical"); resetDraw(category, filter, "alphabetical"); }}>A–Z</button></div>
          <div className="filter"><button className={filter === "all" ? "active" : ""} onClick={() => { setFilter("all"); resetDraw(category, "all"); }}>All cards</button>{drawMode === "random" && <button onClick={shuffle}>↝ Draw another</button>}</div>
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
            <button className="miss" disabled={!flipped} onClick={() => mark(false)}><span>×</span><div><b>Not yet</b><small>Move to review</small></div></button>
            <button className="know" disabled={!flipped} onClick={() => mark(true)}><span>✓</span><div><b>Got it</b><small>3 correct → learned</small></div></button>
          </div>
          <button className="finishGameBelow" disabled={!sessionDone || sessionDone === gameCards.length} onClick={finishGameEarly}>Finish game and see results · {sessionDone} cards completed</button>
        </> : sessionDone === gameCards.length ? <div className="gameComplete">
          <p className="eyebrow">SESSION COMPLETE</p><h2>You finished the lake.</h2>
          <p>Your results include every card completed in this session.</p>
          <div><span><b>{gameCards.length}</b><small>Cards</small></span><span><b>{sessionCorrect}</b><small>Got it</small></span><span><b>{sessionReview}</b><small>Review</small></span></div>
          <div className="completeActions">
            {sessionReview > 0 && <button className="reviewMistakes" onClick={() => restartDeck(true)}>Review my mistakes · {sessionReview}</button>}
            <button className="replayDeck" onClick={() => restartDeck(false)}>Play original deck again · {baseGameCards?.length ?? gameCards.length}</button>
            <button className="backHome" onClick={() => { setGameCards(null); setBaseGameCards(null); setSessionMarks({}); setCurrent(0); }}>Back to home</button>
          </div>
        </div> : <div className="empty"><b>This filtered pool is complete.</b><p>Choose “All cards” or another category to continue the game.</p></div>}
      </section>
      <footer><span>Complete deck · {cards.length} cards · Random by default</span><span>Choose A–Z for alphabetical order. Progress is saved on this device.</span></footer>
    </main>
  );
}
