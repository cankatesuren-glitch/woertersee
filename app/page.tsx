"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { cards as builtInCards, type Card } from "./vocabulary";

type Status = "new" | "review" | "learned";

const emptyProgress = Object.fromEntries(builtInCards.map((card) => [card.id, { status: "new" as Status, streak: 0 }]));

export default function Home() {
  const [progress, setProgress] = useState<Record<string, { status: Status; streak: number }>>(emptyProgress);
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
  const cards = useMemo(() => [...builtInCards, ...customCards], [customCards]);
  const categories = useMemo(() => [...new Set(cards.map((item) => item.category))], [cards]);
  const [gameSetup, setGameSetup] = useState(false);
  const [gameCount, setGameCount] = useState(200);
  const [gameCategories, setGameCategories] = useState<string[]>([]);
  const [gameCards, setGameCards] = useState<Card[] | null>(null);
  const [sessionMarks, setSessionMarks] = useState<Record<string, "review" | "correct">>({});
  const activeCards = gameCards ?? cards;

  useEffect(() => {
    const saved = localStorage.getItem("wortpool-progress-v1");
    if (saved) setProgress((base) => ({ ...base, ...JSON.parse(saved) }));
    const savedCustom = localStorage.getItem("woertersee-custom-cards-v1");
    if (savedCustom) setCustomCards(JSON.parse(savedCustom));
    setCurrent(Math.floor(Math.random() * builtInCards.length));
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) localStorage.setItem("wortpool-progress-v1", JSON.stringify(progress));
  }, [progress, ready]);

  useEffect(() => {
    if (ready) localStorage.setItem("woertersee-custom-cards-v1", JSON.stringify(customCards));
  }, [customCards, ready]);

  const visible = useMemo(() => {
    const result = activeCards.filter((card) =>
      (category === "All" || card.category === category) &&
      (filter === "all" || progress[card.id]?.status === filter)
    );
    return drawMode === "alphabetical" ? [...result].sort((a, b) => a.de.localeCompare(b.de, "de")) : result;
  }, [activeCards, category, filter, progress, drawMode]);
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
    setSessionMarks((items) => ({ ...items, [card.id]: known ? "correct" : "review" }));
    setProgress((prev) => {
      const old = prev[card.id] ?? { status: "new" as Status, streak: 0 };
      const streak = known ? old.streak + 1 : 0;
      return { ...prev, [card.id]: { streak, status: known && streak >= 3 ? "learned" : "review" } };
    });
    advance();
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
    const pools = selected.map((name) => shuffled(cards.filter((item) => item.category === name))).filter((pool) => pool.length);
    const target = Math.min(Math.max(1, gameCount), pools.reduce((sum, pool) => sum + pool.length, 0));
    const chosen: Card[] = [];
    let round = 0;
    while (chosen.length < target && pools.some((pool) => round < pool.length)) {
      for (const pool of pools) {
        if (chosen.length < target && round < pool.length) chosen.push(pool[round]);
      }
      round++;
    }
    setGameCards(shuffled(chosen));
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
          <label className="countLabel">Number of cards<input type="number" min="1" max={cards.length} value={gameCount} onChange={(e) => setGameCount(Number(e.target.value))} /></label>
          <div className="quickCounts">{[50,100,200,300].map((count) => <button key={count} className={gameCount === count ? "active" : ""} onClick={() => setGameCount(count)}>{count}</button>)}</div>
          <div className="categoryHeading"><b>Categories</b><button onClick={() => setGameCategories(gameCategories.length === categories.length ? [] : categories)}>{gameCategories.length === categories.length ? "Clear all" : "Select all"}</button></div>
          <div className="categoryGrid landingCategories">{categories.map((item) => <label key={item} className={gameCategories.includes(item) ? "selected" : ""}><input type="checkbox" checked={gameCategories.includes(item)} onChange={() => toggleGameCategory(item)} /><span>{item}</span><small>{cards.filter((card) => card.category === item).length}</small></label>)}</div>
          <button className="startGame" disabled={!gameCategories.length || gameCount < 1} onClick={startCustomGame}>Start balanced game · {Math.min(gameCount || 0, cards.filter((item) => gameCategories.includes(item.category)).length)} cards</button>
        </article>
      </section>
      <section className="landingFooter"><div><b>{cards.length}</b><span>Total words</span></div><div><b>{categories.length}</b><span>Categories</span></div><div><b>{customCards.length}</b><span>My words</span></div><p>Your progress and personal words stay saved in this browser.</p></section>
    </main>
  );

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#">Wörter<span>see</span></a>
        <div className="headerActions"><button className="endGame" onClick={() => { setGameCards(null); setCurrent(0); setSessionMarks({}); }}>← Exit game</button><div className="session"><span className="pulse" /> Game progress <strong>{sessionDone}</strong> / {gameCards.length}</div></div>
      </header>

      {gameSetup && <div className="gameOverlay" onClick={() => setGameSetup(false)}>
        <section className="gameBuilder" onClick={(event) => event.stopPropagation()}>
          <button className="closeBuilder" onClick={() => setGameSetup(false)}>×</button>
          <p className="eyebrow">CUSTOM GAME</p><h2>Build your study pool</h2>
          <p>Choose the number of cards and the categories. Cards are distributed as evenly as possible across your selection.</p>
          <label className="countLabel">Number of cards<input type="number" min="1" max={cards.length} value={gameCount} onChange={(e) => setGameCount(Number(e.target.value))} /></label>
          <div className="quickCounts">{[50,100,200,300].map((count) => <button key={count} className={gameCount === count ? "active" : ""} onClick={() => setGameCount(count)}>{count}</button>)}</div>
          <div className="categoryHeading"><b>Categories</b><button onClick={() => setGameCategories(gameCategories.length === categories.length ? [] : categories)}>{gameCategories.length === categories.length ? "Clear all" : "Select all"}</button></div>
          <div className="categoryGrid">{categories.map((item) => <label key={item} className={gameCategories.includes(item) ? "selected" : ""}><input type="checkbox" checked={gameCategories.includes(item)} onChange={() => toggleGameCategory(item)} /><span>{item}</span><small>{cards.filter((card) => card.category === item).length}</small></label>)}</div>
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
          <button className="addWordButton" onClick={() => setAdding((value) => !value)}>{adding ? "× Close" : "+ Add my word"}</button>
          {adding && <form className="addForm" onSubmit={addCustomCard}>
            <label>German<input value={newGerman} onChange={(e) => setNewGerman(e.target.value)} placeholder="e.g. die Aussicht" autoFocus required /></label>
            <label>English<input value={newEnglish} onChange={(e) => setNewEnglish(e.target.value)} placeholder="e.g. prospect" required /></label>
            <label>Category<select value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              <option>My words</option>
              {[...new Set(builtInCards.map((item) => item.category))].map((item) => <option key={item}>{item}</option>)}
            </select></label>
            <label>Note <small>optional</small><input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Grammar or example" /></label>
            <button type="submit">Add to my pool</button>
            <p>Saved only in this browser.</p>
          </form>}
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
        </> : <div className="empty"><b>This pool is empty for now.</b><p>Choose another pool or category.</p></div>}
      </section>
      <footer><span>Complete deck · {cards.length} cards · Random by default</span><span>Choose A–Z for alphabetical order. Progress is saved on this device.</span></footer>
    </main>
  );
}
