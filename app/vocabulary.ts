import { irregularForms } from "./irregular-forms";
import { chapterAdditions } from "./chapter-additions";

export type Card = { id: string; de: string; en: string; category: string; detail?: string; example?: string };

const irregular = `
abbrechen|to cancel / break off
abfahren|to depart
abgeben|to hand in / give away
abhängen|to depend / hang
abheben|to lift / withdraw
abnehmen|to lose weight / take off
abschließen|to complete / lock
anbieten|to offer
anerkennen|to recognize
anfangen|to begin
angeben|to state / show off
ankommen|to arrive
annehmen|to accept
anrufen|to call
ansehen|to look at
ansprechen|to address
anwenden|to apply
auffallen|to stand out
aufgeben|to give up
aufheben|to pick up / keep
aufladen|to charge / load
aufnehmen|to record / take in
aufstehen|to get up
auftreten|to occur / appear
ausfallen|to be cancelled / fail
ausgehen|to go out / assume
ausleihen|to borrow
ausschlafen|to sleep in
aussehen|to look / appear
aussprechen|to pronounce / express
aussteigen|to get out
ausweichen|to avoid / give way
ausziehen|to take off / move out
backen|to bake
befehlen|to command
sich befinden|to be located
beginnen|to begin
begreifen|to understand
behalten|to keep
beibringen|to teach
beißen|to bite
bekommen|to get / receive
beraten|to advise
beschließen|to decide
besprechen|to discuss
bestehen|to pass / exist
betreffen|to concern
betreiben|to operate
betrügen|to deceive
sich beziehen|to refer
biegen|to bend
bieten|to offer
binden|to bind / tie
bitten|to ask / request
bleiben|to stay
braten|to fry / roast
brechen|to break
brennen|to burn
bringen|to bring
denken|to think
dürfen|may / to be allowed
eindringen|to penetrate / intrude
einfallen|to occur to someone
eingeben|to enter / input
einhalten|to comply with
einladen|to invite
einschlafen|to fall asleep
einschließen|to include / lock in
einwerfen|to throw in / post
einziehen|to move in / collect
empfangen|to receive
empfehlen|to recommend
empfinden|to feel / perceive
enthalten|to contain
entlassen|to dismiss / release
entnehmen|to take from / infer
entscheiden|to decide
sich entschließen|to make up one’s mind
entsprechen|to correspond to
entstehen|to arise
entwerfen|to design / draft
erfahren|to learn / experience
erfinden|to invent
sich ergeben|to result / surrender
ergreifen|to seize
erhalten|to receive / preserve
erkennen|to recognize
erscheinen|to appear
ertragen|to endure
sich erweisen|to prove to be
erwerben|to acquire
erziehen|to raise / educate
essen|to eat
fahren|to drive / travel
fallen|to fall
fangen|to catch
fernsehen|to watch television
feststehen|to be certain
finden|to find
fliegen|to fly
fliehen|to flee
fließen|to flow
fressen|to eat (animals)
frieren|to freeze / feel cold
geben|to give
gefallen|to please
gehen|to go
gelingen|to succeed
gelten|to apply / be valid
genießen|to enjoy
geraten|to get into / turn out
geschehen|to happen
gewinnen|to win
gießen|to pour
greifen|to grasp
haben|to have
halten|to hold / stop
hängen|to hang
heben|to lift
heißen|to be called
helfen|to help
herunterladen|to download
hervorheben|to emphasize
hinterlassen|to leave behind
hinweisen|to point out
hüpfen|to hop
kennen|to know / be familiar with
klingen|to sound
kommen|to come
können|can / to be able to
laden|to load / charge
lassen|to let / leave
laufen|to run / walk
leiden|to suffer
leihen|to lend / borrow
lesen|to read
liegen|to lie / be located
lügen|to lie
meiden|to avoid
messen|to measure
missverstehen|to misunderstand
mitbringen|to bring along
mitnehmen|to take along
mögen|to like
müssen|must / to have to
nachgeben|to give in
nachlassen|to diminish
nachweisen|to prove
nehmen|to take
nennen|to name / call
raten|to advise / guess
reiben|to rub
reiten|to ride
rennen|to run
riechen|to smell
rufen|to call / shout
scheinen|to seem / shine
schieben|to push
schiefgehen|to go wrong
schießen|to shoot
schlafen|to sleep
schlagen|to hit
schleichen|to sneak
schleifen|to grind / drag
schließen|to close
schmeißen|to throw
schneiden|to cut
schreiben|to write
schreien|to scream
schweigen|to remain silent
schwimmen|to swim
sehen|to see
sein|to be
senden|to send
singen|to sing
sinken|to sink
sitzen|to sit
sollen|should / to be supposed to
spazieren gehen|to go for a walk
sprechen|to speak
springen|to jump
stattfinden|to take place
stechen|to sting / stab
stehen|to stand
stehlen|to steal
steigen|to climb / rise
sterben|to die
stoßen|to push / bump
streichen|to paint / cancel
streiten|to argue
teilnehmen|to participate
tragen|to carry / wear
treffen|to meet / hit
treiben|to drive / pursue
treten|to step / kick
trinken|to drink
tun|to do
überlassen|to leave to
übernehmen|to take over
übertreffen|to surpass
übertreiben|to exaggerate
überweisen|to transfer
überwinden|to overcome
umfahren|to drive around
umfahren (separable)|to knock down
umfallen|to fall over
umgeben|to surround
umsteigen|to change trains
umziehen|to move / change clothes
unterbrechen|to interrupt
unterhalten|to entertain
unterlassen|to refrain from
unternehmen|to undertake
unterscheiden|to distinguish
unterschreiben|to sign
unterstreichen|to underline
verbergen|to hide
verbieten|to forbid
verbinden|to connect
verbrennen|to burn
verbringen|to spend (time)
vergeben|to forgive / award
vergessen|to forget
vergleichen|to compare
sich verhalten|to behave
verlassen|to leave
verlieren|to lose
vermeiden|to avoid
verraten|to betray / reveal
verschieben|to postpone / move
verschlafen|to oversleep
verschwinden|to disappear
versprechen|to promise
verstehen|to understand
vertragen|to tolerate / get along
vertreiben|to drive away / distribute
vertreten|to represent
verzeihen|to forgive
vorhaben|to intend
vorkommen|to occur
vorlesen|to read aloud
vorliegen|to be available
vorschlagen|to suggest
vorschreiben|to prescribe
vortragen|to present
vorweisen|to produce / show
wachsen|to grow
wahrnehmen|to perceive / attend
waschen|to wash
wegfallen|to be omitted
weglassen|to leave out
weitergeben|to pass on
weiterkommen|to make progress
werben|to advertise / recruit
werden|to become
werfen|to throw
widerrufen|to revoke
widersprechen|to contradict
wiedergeben|to reproduce
wiedersehen|to see again
wiegen|to weigh
wissen|to know
wollen|to want
ziehen|to pull / move
zugeben|to admit
zurechtfinden|to find one’s way
zurücktreten|to resign / step back
zusammentreffen|to meet / coincide
zwingen|to force`;

const verbPrep = `
achten auf + Akk.|to pay attention to
ankommen auf + Akk.|to depend on
anpassen an + Akk.|to adapt to
antworten auf + Akk.|to answer
sich ärgern über + Akk.|to be annoyed about
aufpassen auf + Akk.|to look after
ausgeben für + Akk.|to spend on
sich bedanken für + Akk.|to thank for
sich begeistern für + Akk.|to be enthusiastic about
sich beklagen über + Akk.|to complain about
berichten über + Akk.|to report on
sich beschweren über + Akk.|to complain about
sich bewerben auf/um + Akk.|to apply for
sich beziehen auf + Akk.|to refer to
bitten um + Akk.|to ask for
danken für + Akk.|to thank for
denken an + Akk.|to think of
diskutieren über + Akk.|to discuss
eingehen auf + Akk.|to respond to
sich einigen auf + Akk.|to agree on
sich einsetzen für + Akk.|to advocate for
sich engagieren für/gegen + Akk.|to campaign for/against
sich entscheiden für/gegen + Akk.|to decide for/against
sich entschuldigen für + Akk.|to apologize for
sich erinnern an + Akk.|to remember
erzählen über + Akk.|to tell about
sich freuen auf + Akk.|to look forward to
sich freuen über + Akk.|to be pleased about
sich gewöhnen an + Akk.|to get used to
glauben an + Akk.|to believe in
halten für + Akk.|to consider as
sich halten an + Akk.|to adhere to
sich handeln um + Akk.|to be about
hinweisen auf + Akk.|to point out
hoffen auf + Akk.|to hope for
sich informieren über + Akk.|to inform oneself about
sich interessieren für + Akk.|to be interested in
investieren in + Akk.|to invest in
kämpfen für/gegen + Akk.|to fight for/against
sich konzentrieren auf + Akk.|to concentrate on
sich kümmern um + Akk.|to take care of
lachen über + Akk.|to laugh about
nachdenken über + Akk.|to think about
reagieren auf + Akk.|to react to
reden über + Akk.|to talk about
schimpfen über + Akk.|to complain about
sorgen für + Akk.|to ensure / provide for
sich sorgen um + Akk.|to worry about
sich spezialisieren auf + Akk.|to specialize in
sprechen über + Akk.|to speak about
sich streiten über/um + Akk.|to argue about
sich verlassen auf + Akk.|to rely on
sich verlieben in + Akk.|to fall in love with
verzichten auf + Akk.|to do without
sich vorbereiten auf + Akk.|to prepare for
warten auf + Akk.|to wait for
sich wenden an + Akk.|to turn to
werben für + Akk.|to advertise for
sich wundern über + Akk.|to wonder about
abhalten von + Dat.|to prevent from
abhängen von + Dat.|to depend on
sich abmelden von + Dat.|to deregister from
abraten von + Dat.|to advise against
ändern an + Dat.|to change
anfangen mit + Dat.|to start with
anrufen bei + Dat.|to call
arbeiten an/bei/in + Dat.|to work on/at/in
aufhören mit + Dat.|to stop
ausgehen von + Dat.|to assume / proceed from
sich auskennen mit + Dat.|to be familiar with
sich austauschen mit + Dat.|to exchange with
sich bedanken bei + Dat.|to thank someone
sich befassen mit + Dat.|to deal with
sich befinden in + Dat.|to be located in
beginnen mit + Dat.|to begin with
beitragen zu + Dat.|to contribute to
sich beklagen bei + Dat.|to complain to
berichten von + Dat.|to report about
sich beschweren bei + Dat.|to complain to
bestehen aus + Dat.|to consist of
bestellen bei + Dat.|to order from
sich beteiligen an + Dat.|to participate in
sich bewerben bei + Dat.|to apply to
bringen zu + Dat.|to cause / bring to
diskutieren mit + Dat.|to discuss with
einladen zu + Dat.|to invite to
sich entschließen zu + Dat.|to decide to
sich entschuldigen bei + Dat.|to apologize to
erhalten von + Dat.|to receive from
sich erholen von + Dat.|to recover from
erkennen an + Dat.|to recognize by
sich erkundigen bei/nach + Dat.|to inquire with/about
erwarten von + Dat.|to expect from
erzählen von + Dat.|to tell about
erziehen zu + Dat.|to raise to be
experimentieren mit + Dat.|to experiment with
fragen nach + Dat.|to ask about
führen zu + Dat.|to lead to
gehören zu + Dat.|to belong to
gratulieren zu + Dat.|to congratulate on
handeln mit/von + Dat.|to trade in / be about
halten von + Dat.|to think of
helfen bei + Dat.|to help with
hören von + Dat.|to hear from
klarkommen mit + Dat.|to cope with
klingen nach + Dat.|to sound like
leiden an/unter + Dat.|to suffer from
liegen an + Dat.|to be due to
sich melden bei + Dat.|to contact
motivieren zu + Dat.|to motivate to
nachfragen bei + Dat.|to inquire with
sich orientieren an + Dat.|to follow / orient oneself by
passen zu + Dat.|to suit
raten zu + Dat.|to advise
sich retten vor + Dat.|to save oneself from
sich richten nach + Dat.|to follow / comply with
schmecken nach + Dat.|to taste like
sprechen mit/von + Dat.|to speak with/about
sterben an + Dat.|to die of
teilnehmen an + Dat.|to participate in
telefonieren mit + Dat.|to phone
träumen von + Dat.|to dream of
sich treffen mit + Dat.|to meet with
sich trennen von + Dat.|to separate from
überreden zu + Dat.|to persuade to
überzeugen von + Dat.|to convince of
umgehen mit + Dat.|to deal with
sich unterscheiden von + Dat.|to differ from
unterstützen bei + Dat.|to support with
sich verabreden mit + Dat.|to arrange to meet
sich verabschieden von + Dat.|to say goodbye to
verbinden/vergleichen mit + Dat.|to connect/compare with
verlangen von + Dat.|to demand from
sich verstecken vor + Dat.|to hide from
sich verstehen mit + Dat.|to get along with
vorbeikommen bei + Dat.|to stop by
vorkommen bei + Dat.|to occur with
vortragen vor + Dat.|to present before
weglaufen vor + Dat.|to run away from
sich wünschen von + Dat.|to wish for from
zurückkommen von + Dat.|to return from
zählen zu + Dat.|to count among
zweifeln an + Dat.|to doubt
zwingen zu + Dat.|to force to`;

const adjectivePrep = `
allergisch auf/gegen|allergic to
angewiesen auf|dependent on
bekannt für|known for
dankbar für|grateful for
erstaunt über|amazed at
froh über|glad about
geeignet für|suitable for
gewöhnt an|accustomed to
glücklich über|happy about
informiert über|informed about
spezialisiert auf|specialized in
stolz auf|proud of
traurig über|sad about
überrascht über/von|surprised by
verantwortlich für|responsible for
verärgert über|annoyed about
vorbereitet auf|prepared for
wichtig für|important for
zuständig für|responsible for
abhängig von|dependent on
alternativ zu|an alternative to
arm/reich an|poor/rich in
ausgehend von|based on
begeistert von|enthusiastic about
bereit zu|ready to
beschäftigt mit|busy with
beteiligt an|involved in
betroffen von|affected by
einverstanden mit|in agreement with
entschlossen zu|determined to
enttäuscht von|disappointed by
erfahren in|experienced in
fähig zu|capable of
interessiert an|interested in
überrascht von|surprised by
überzeugt von|convinced of
unabhängig von|independent of
verbunden mit|connected with
verwandt mit|related to
vorsichtig mit/bei|careful with
zufrieden mit|satisfied with`;

const nounVerb = `
Abschied nehmen von|to say goodbye to
die Absicht haben|to intend
eine Absprache treffen mit|to make an arrangement with
eine Ahnung haben von|to have an idea about
eine Andeutung machen|to make a hint
Anerkennung finden|to receive recognition
einen Anfang machen|to make a start
eine Anforderung erfüllen|to meet a requirement
ein Angebot machen/unterbreiten|to make an offer
etwas im Angebot haben|to have something on offer
etwas in Anspruch nehmen|to make use of
einen Antrag stellen auf|to submit an application for
eine Antwort/Anweisung geben|to give an answer/instruction
zur Anwendung kommen|to be applied
einen Auftrag erteilen|to place an order
in Auftrag geben|to commission
aus den Augen verlieren|to lose sight of
zum Ausdruck bringen/kommen|to express / be expressed
Auskunft geben|to provide information
eine Äußerung machen|to make a statement
Beachtung finden/schenken|to receive/pay attention
einen Beitrag leisten|to make a contribution
Berücksichtigung finden|to be taken into account
Bescheid geben|to let someone know
eine Bestellung aufgeben|to place an order
in Betracht kommen/ziehen|to be considered / consider
in Betrieb nehmen|to put into operation
Bezug nehmen auf|to refer to
im Blick haben|to keep an eye on
die Daumen drücken für|to keep one’s fingers crossed for
zur Debatte/Diskussion stehen|to be up for debate
eine Diskussion führen|to hold a discussion
unter Druck setzen|to put under pressure
einen Eindruck bekommen/machen|to get/make an impression
Einfluss nehmen auf|to influence
eine Entscheidung treffen|to make a decision
zur Entscheidung bringen/stellen|to bring/put up for decision
eine Erfahrung machen mit|to have an experience with
in Erfahrung bringen|to find out
in Erfüllung gehen|to come true
eine Erklärung finden für|to find an explanation for
Ersatz leisten für|to provide compensation for
Feedback bekommen/geben|to receive/give feedback
einen Fehler beheben|to fix an error
zur Folge haben|to result in
eine Forderung/Frage stellen|to make a demand / ask a question
eine Freude bereiten|to give pleasure
ins Geschäft kommen mit|to go into business with
ein Gespräch führen|to have a conversation
ins Gespräch bringen|to bring up for discussion
den Glauben verlieren|to lose faith
etwas im/in den Griff haben/bekommen|to have/get under control
auf den Grund gehen|to get to the bottom of
jemanden vor eine Herausforderung stellen|to present someone with a challenge
Hilfe leisten / zu Hilfe nehmen|to provide / enlist help
die Hoffnung aufgeben|to give up hope
sich Hoffnung machen|to have hope
auf eine Idee kommen|to get an idea
infrage kommen/stellen|to be an option / question
Interesse wecken/zeigen|to arouse/show interest
in Kenntnis setzen / zur Kenntnis nehmen|to inform / take note
Kontakt aufnehmen/halten/knüpfen|to make/maintain/establish contact
in Kontakt stehen/treten|to be/get in contact
die Kosten tragen/übernehmen|to bear/cover the costs
in Kraft treten|to come into force
Krieg führen|to wage war
Kritik üben|to criticize
den Kürzeren ziehen|to come off worse
jemanden auf dem Laufenden halten|to keep someone updated
auf dem Laufenden sein|to be up to date
der Meinung sein|to be of the opinion
in Ordnung bringen|to put in order
ein Profil anlegen|to create a profile
eine Prüfung bestehen / durchfallen|to pass / fail an exam
eine Qualifikation mitbringen|to have a qualification
einen Rat geben|to give advice
Rechenschaft ablegen über|to account for
zur Rechenschaft ziehen|to hold accountable
in Rechnung stellen|to invoice
eine Rede halten|to give a speech
in eine Reihenfolge bringen|to put in order
den Respekt verlieren vor|to lose respect for
Rückmeldung geben|to give feedback
Rücksicht nehmen auf|to show consideration for
die Ruhe bewahren|to remain calm
Schluss machen mit|to put an end to
zur Sprache bringen|to bring up
Stellung nehmen zu|to comment on
unter Strafe stehen/stellen|to be punishable / make punishable
in Streik treten|to go on strike
Stress haben mit / unter Stress stehen|to have trouble with / be under stress
eine Tätigkeit ausüben|to carry out an activity
im Trend liegen|to be trendy
einen Überblick bekommen/geben|to get/give an overview
einen Unterschied machen|to make a difference
eine Verabredung/Vereinbarung treffen|to make an appointment/agreement
die Verantwortung übernehmen für|to take responsibility for
sich in Verbindung setzen mit|to get in touch with
zur Verfügung stehen/stellen|to be available / provide
in Verhandlungen stehen/treten|to be/enter negotiations
ein Versprechen geben|to make a promise
einen Vertrag abschließen|to conclude a contract
Vertrauen herstellen|to build trust
Vorbereitungen treffen|to make preparations
im Vordergrund stehen|to be the main focus
einen Vorschlag machen/unterbreiten|to make a proposal
Vorsorge treffen für|to take precautions for
eine Wahl treffen|to make a choice
im Wettbewerb stehen mit|to compete with
Wert legen auf|to attach importance to
Wertschätzung genießen|to enjoy appreciation
Widerstand leisten gegen|to resist
Wirkung zeigen|to take effect
das Wort ergreifen|to take the floor
ein Ziel setzen/verfolgen|to set/pursue a goal
eine Zusage erhalten|to receive confirmation
im Zusammenhang stehen mit|to be connected with`;

const nounPrep = `
die Aktion für/gegen|campaign for/against
die Angst um/vor|fear for/of
die Anregung für|suggestion for
die Antwort auf|answer to
der Ärger über|annoyance about
das Argument für/gegen|argument for/against
die Aussicht auf|prospect of
die Auswirkung auf|effect on
die Begeisterung für|enthusiasm for
die Begründung für|reason for
die Bemühung um|effort to obtain
die Chance auf|chance of
der Dank für|thanks for
die Diskussion über|discussion about
der Einfluss auf|influence on
das Engagement für/gegen|commitment for/against
die Entscheidung für/gegen|decision for/against
die Freude auf/über|anticipation of / joy about
das Gespräch über/mit|conversation about/with
die Gewöhnung an|adaptation to
der Grund für/gegen|reason for/against
die Hoffnung auf|hope for
die Information über/zu|information about
das Interesse für/an|interest in
die Konzentration auf|concentration on
die Reaktion auf|reaction to
das Recht auf|right to
die Ursache für|cause of
die Verantwortung für|responsibility for
der Verzicht auf|renunciation of
die Voraussetzung für|prerequisite for
die Vorbereitung auf|preparation for
die Abhängigkeit von|dependence on
die Alternative zu|alternative to
die Änderung an|change to
die Anerkennung von|recognition of
die Arbeit an|work on
die Auseinandersetzung mit|engagement with
die Auswahl an|selection of
die Beschäftigung mit|engagement with
die Beteiligung an|participation in
der Entschluss zu|decision to
die Erfahrung mit|experience with
der Erfolg in|success in
die Furcht vor|fear of
der Respekt vor|respect for
der Schutz vor|protection from
die Suche nach|search for
die Teilnahme an|participation in
die Trennung von|separation from
der Umgang mit|dealing with
die Verabredung mit|appointment with`;

const chapters: Record<string, string> = {
  "Kapitel 1 · Hier arbeite ich": `die Klimaanlage|air-conditioning system
die Leiter|ladder
die Werkbank|workbench
der Werkzeugkasten|toolbox
der Schutzhelm|safety helmet
sanitäre Anlagen installieren|to install sanitary facilities
verstopfte Rohre reinigen|to clean blocked pipes
die Mieterhöhung|rent increase
die Zusage|confirmation
das Onlineportal|online portal
das Objekt|property / object
der Grundriss|floor plan
der Interessent / die Interessentin|prospective customer
die Altbauwohnung|apartment in an old building
die Einbauküche|fitted kitchen
der Fahrstuhl|elevator
die Werkstatt|workshop
die Hausverwaltung|property management
die Daumen drücken|to keep one’s fingers crossed
der Auszug|moving out
die Leitung|pipe / management
die Spedition|moving company
der Umzugskarton|moving box
der Einkommensnachweis|proof of income
das Maklerbüro|real estate agency
die Kaution|deposit
der Besichtigungstermin|viewing appointment
die Praxis|medical practice
sich kümmern um|to take care of
die Branche|sector / industry
die Checkliste|checklist
der Gewerberaum|commercial space
die Hygieneanforderung|hygiene requirement
die Flexibilität|flexibility
untervermieten|to sublet
die Übergabe|handover
das Übergabeprotokoll|handover report
ein Angebot einholen|to obtain a quotation
noch etwas Spielraum haben|to have some room for manoeuvre
die Frist|deadline
mutig|courageous
spontan|spontaneous
mittelgroß|medium-sized
selbstständig arbeiten|to work independently
Kontakt bekommen|to make contact
der Betriebsausflug|company outing
in Ordnung sein|to be in order
sich wohlfühlen|to feel comfortable
die Kaffeeküche|office kitchen
der Riss|crack
sich ein Problem ansehen|to look at a problem
die Schilderung des Problems|description of the problem
die Erreichbarkeit|availability
die verantwortliche Firma|responsible company
einen Schaden beheben|to repair damage
der Reparaturauftrag|repair order`,
  "Kapitel 2 · Mein eigener Laden": `der Kiosk|kiosk
der Lieferant / die Lieferantin|supplier
die Tiefkühlkost|frozen food
liefern|to deliver
das Warenangebot|range of goods
die Öffnungszeit|opening time
rund um die Uhr|around the clock
die Auswahl|selection
die Besorgung|errand / procurement
der Einheimische|local resident
das Zuhause|home
freiberuflich|freelance
sich etwas einteilen|to organize one’s time
der Auftrag|order / assignment
die Gleitzeit|flexitime
der Schichtdienst|shift work
der Feierabend|end of the working day
die Frühschicht|early shift
die Spätschicht|late shift
die Buchführung|bookkeeping
der Pachtvertrag|lease agreement
das Sortiment|product range
die Lage|location
finanzielle Rücklagen|financial reserves
eröffnen|to open
gewerblich|commercial
die Reserve|reserve
die Einnahme|income
die Ausgabe|expense
die Verwirklichung|realization
profitieren von|to benefit from
selbstständig|self-employed
die Versicherung|insurance
die Geschäftsidee|business idea
der Familienbetrieb|family business
der Konzern|corporation
die Lieferung|delivery
die Rücksendung|return shipment
die Logistik|logistics
die Nachfrage|demand / inquiry
die Pleite|bankruptcy
der Kredit|loan
einen Kredit aufnehmen|to take out a loan
gründen|to found / establish
die Gewerbefläche|commercial premises
der Existenzgründer|business founder
günstig|favourable
der Zuschuss|subsidy
der Dienstplan|work schedule
etwas übernehmen|to take over
etwas einhalten|to comply with
ausnahmsweise|as an exception
der Umstand|circumstance
der Arbeitsauftrag|work order
dringend|urgent
zuständig|responsible`,
  "Kapitel 3 · Arbeit im Team": `die Teamarbeit|teamwork
das Zusammenspiel|interaction
sich anstrengen|to make an effort
weiterkommen|to make progress
verteilen|to distribute
die Mannschaft|team
Kritik üben|to criticize
die Rundmail|group email
souverän|confident
die Absprache|arrangement
unvoreingenommen|unbiased
überlastet|overloaded
der Verbesserungsvorschlag|suggestion for improvement
sich unbeliebt machen|to make oneself unpopular
einen schlechten Eindruck hinterlassen|to leave a bad impression
die Ehrlichkeit|honesty
jemanden loben|to praise someone
etwas vertuschen|to cover something up
überfordert|overwhelmed
das Gerücht|rumour
verhindern|to prevent
gelassen|calm
das Vorurteil|prejudice
umgehen mit|to deal with
eine Entscheidung treffen|to make a decision
der Abteilungsleiter|department manager
Verhandlungen führen|to conduct negotiations
einen Auftrag vergeben|to award a contract
die Buchhaltung|accounting
die Fachhochschule|university of applied sciences
der Versand|dispatch
das Personal|staff
das Protokoll|minutes / record
der Tagesordnungspunkt|agenda item
das Buffet|buffet
die Servicekraft|service employee
präzise|precise
sachlich|objective
neutral|neutral
ausschließlich|exclusively
der Entwurf|draft
die Visitenkarte|business card
abstimmen|to coordinate / vote
problematisch|problematic
die Schulung|training
sich aufteilen|to divide up
komplex|complex
per Zufall|by chance
ein Ergebnis erzielen|to achieve a result
die Kompetenz|competence
improvisieren|to improvise
die Ausdauer|endurance
die Treue|loyalty
einen Gegenpol bilden|to form a counterbalance
systematisch|systematic
das Faktenwissen|factual knowledge
detailliert|detailed
die Vorgabe|guideline
die Neugier|curiosity
die Innovation|innovation
motivierend|motivating
einen Einblick bekommen|to gain an insight`,
  "Kapitel 4 · Tourismus": `die Pauschalreise|package holiday
die Vollpension|full board
alles inklusive|all-inclusive
die Hotelanlage|hotel complex
die Reisegruppe|tour group
das Angebot|offer
sich erholen|to recover / relax
der Frühbucherrabatt|early-booking discount
die Halbpension|half board
das Erlebnis|experience
sensationell|sensational
der Haken|catch / drawback
die Gebühr|fee
versteckte Gebühren|hidden fees
die Anzahlung|deposit
erreichbar|reachable
die Reiserücktrittsversicherung|travel cancellation insurance
eine Versicherung abschließen|to take out insurance
die Kosten|costs
für die Kosten aufkommen|to cover the costs
die Geschäftsbedingungen|terms and conditions
stornieren|to cancel
buchen|to book
im Krankheitsfall|in case of illness
aufwachsen|to grow up
der Master|master’s degree
sich spezialisieren auf|to specialize in
betreuen|to look after
unterwegs sein|to be on the road
zur Verfügung stehen|to be available
anspruchsvoll|demanding
das feste Einkommen|fixed income
reibungslos|smooth
das Check-in/out|check-in/out
die Koordination|coordination
abwechslungsreich|varied
begeistert|enthusiastic
die Anerkennung|recognition
die Anforderung|requirement
die Bewerbungsunterlagen|application documents
vollständig|complete
das Berufsbild|job profile
die Umbuchung|rebooking
ausgebucht|fully booked
hoffnungslos|hopeless
überbucht|overbooked
zaubern|to perform magic / conjure
in der Lage sein|to be capable of
die Rückkehr|return
die Presse|press`,
  "Kapitel 5 · Aktiv im Handwerk": `(Boden/Stromleitungen) verlegen|to lay flooring/power lines
nähen|to sew
die Dichtung|seal
auswechseln|to replace
eine Steckdose anbringen|to install a socket
tapezieren|to wallpaper
der Schraubenzieher|screwdriver
Metallstücke zusammenschweißen|to weld pieces of metal together
das Dach decken|to roof
Waschbecken montieren|to install washbasins
die Nadel|needle
der Faden|thread
der Stoff|fabric
das Maßband|tape measure
defekt|defective
das Abflussrohr|drainpipe
der Baumarkt|DIY store
der Umgang|handling
speziell|special
das Konzept|concept
sich fest etablieren|to become firmly established
das Niveau|level
der Fortbildungsbedarf|training need
den Teppich reinigen|to clean the carpet
zuschneiden|to cut to size
das Preisschild|price tag
erneuern|to renew
einen Fleck entfernen|to remove a stain
die Aufmerksamkeit|attention
sich lohnen|to be worthwhile
verzweifelt|desperate
die Verspätung|delay
der Anschlusszug|connecting train
die Kündigungsfrist|notice period
die Arbeitsbedingungen|working conditions
die Gewerkschaft|trade union
beitreten|to join
jemanden beraten|to advise someone
der Heimwerker|DIY enthusiast
der Notdienst|emergency service
die Montage|installation
die Montageanleitung|assembly instructions
allein klarkommen|to manage alone
der Hauptbahn|main station
zudrehen|to turn off
Wasser ablassen|to drain water
das Ventil|valve
ein Baby wickeln|to change a baby
abdecken|to cover
die Klappe|flap
die Grundlage legen|to lay the foundation
der Arbeitsbereich|work area
das Mobbing|bullying
vor Ort|on site
vereinfachen|to simplify
verbilligen|to reduce the price
die Instandhaltung|maintenance
die Wartung|servicing
sorgfältig|careful
unterkommen|to find accommodation
unternehmen|to undertake
sich fit machen|to prepare oneself
der Ausbildungsbetrieb|training company
die Berufsschule|vocational school
durchführen|to carry out
etwas überdenken|to reconsider something
nachhaltig|sustainable
sanieren|to renovate
unpraktisch|impractical
die Messung|measurement
die Auswirkung|effect
jemanden unter Druck setzen|to put someone under pressure
das Design|design
die Kosten überschlagen|to estimate costs`,
  "Kapitel 6 · Arbeit in der Metropolregion": `die Region|region
das Industrieunternehmen|industrial company
der öffentliche Nahverkehr|public transport
der Aspekt|aspect
die Werkstatt|workshop
das Rathaus|town hall
der Lottogewinn|lottery win
wirtschaftlich|economic
sich Gedanken machen|to give thought to
demografisch|demographic
die Entwicklung|development
einheimisch|local
die Bevölkerung|population
die Zuwanderung|immigration
die duale Hochschule|dual university
die Fahrzeit|travel time
in Kauf nehmen|to accept / put up with
das Freibad|outdoor swimming pool
vielfältig|diverse
das Freizeitangebot|leisure facilities
knapp sein|to be scarce
die Kosten tragen|to bear the costs
Einfluss nehmen|to exert influence
jemandem Hilfe leisten|to assist someone
die Studiengebühren|tuition fees
der Arbeitsmarkt|labour market
das duale Studium|dual study programme
die Ausbildungsdauer|duration of training
das Stipendium|scholarship
die Semesterferien|semester break
der Bereich|area
der Bedarf|need
beruflich tätig sein|to work professionally
überdurchschnittlich|above average
der Arbeitsvertrag|employment contract
die Laufzeit|term / duration
der Vertragsbeginn|start of contract
innerhalb|within
außerhalb|outside
die Vergütung|remuneration
betragen|to amount to
sich verpflichten|to commit oneself
die Bescheinigung|certificate
die Körperpflege|personal hygiene
wetterfest|weatherproof
geheimnisvoll|mysterious
weltberühmt|world-famous
die Ruine|ruin
altersmäßig|age-related
die Begrenzung|limit
die Überbrückung|bridging
der Druck|pressure
das Motiv|motif
die Methode|method
wertvoll|valuable`,
  "Kapitel 7 · Berufe im Gesundheitswesen": `die Grippe|flu
der Durchfall|diarrhoea
der Krebs|cancer
die Arznei|medicine
die Kapsel|capsule
das Antibiotikum|antibiotic
der Masseur / die Masseurin|masseur
der Logopäde / die Logopädin|speech therapist
der Orthopäde / die Orthopädin|orthopaedist
die Diagnose|diagnosis
jemandem assistieren|to assist someone
anleiten|to instruct
jemandem etwas verschreiben|to prescribe something
die Physiotherapie|physiotherapy
fördern|to promote
ansteckend|contagious
die Früherkennung|early detection
der Gesundheitscheck|health check
der Impfpass|vaccination record
die Vorsorge|preventive care
akut|acute
ambulant|outpatient
stationär|inpatient
die Lungenentzündung|pneumonia
der Pflegebericht|care report
die Übergabe|handover
das Hospiz|hospice
angewiesen sein auf|to be dependent on
verpflichtend|mandatory
beabsichtigen|to intend
befürchten|to fear
bedauern|to regret
liebevoll|loving
Wert legen auf|to attach importance to
die Tour|round / tour
der Kreislauf|circulation
der Blutdruck|blood pressure
der Puls|pulse
der Vorrat|supply
aggressiv|aggressive
die Pflegekraft|care worker
die Fakten|facts
subjektiv / objektiv|subjective / objective
die Einschätzung|assessment
jemanden vertreten|to represent someone
die Stufe|level
durchschnittlich|average
die Klarheit|clarity
das Durcheinander|confusion
der Kontostand|account balance
die Schulden|debts
langfristig|long-term
der Streit|dispute
die Überzeugung|conviction
die Belastung|burden
zwangsläufig|inevitable
die Beschleunigung|acceleration
die Work-Life-Balance|work-life balance
grundlegend|fundamental
zum Ausgleich|as compensation
permanent|permanent
überlastet|overloaded
das Homeoffice|working from home`,
  "Kapitel 8 · In der Gastronomie": `das Gericht|dish
mild / scharf|mild / spicy
die silberne Hochzeit|silver wedding anniversary
gewürzt|seasoned
kompetent|competent
die Sorgfalt|care
vegan|vegan
der Allergiker|allergy sufferer
der Liebhaber|enthusiast
erstklassig|first-class
die Zutat|ingredient
umfangreich|extensive
der Genuss|enjoyment
zeitgemäß|contemporary
der Trend|trend
knusprig|crispy
cremig|creamy
reichhaltig|rich / substantial
bewährt|tried and tested
würzig|spicy
das Ambiente|ambience
der Speisesaal|dining room
bewerten|to rate
die Bewertung|rating
der Pluspunkt|advantage
aromatisch|aromatic
sich etwas gönnen|to treat oneself
die Portion|portion
der Gang|course
zuverlässig|reliable
schwören auf|to swear by
der Topf|pot
die Pfanne|pan
das Backblech|baking tray
die Schüssel|bowl
das Sieb|sieve
die Waage|scales
die Pfeffermühle|pepper mill
der Salzstreuer|salt shaker
die Knoblauchpresse|garlic press
der Mixer|mixer
abwiegen|to weigh
reiben|to grate
rühren|to stir
braten|to fry
schälen|to peel
zäh|tough
die Schürze|apron
etwas vermitteln|to convey
vorausdenken|to think ahead
verantwortungsvoll|responsible
erfahren|experienced
eigenverantwortlich|independent / self-responsible
serviceorientiert|service-oriented
belastbar|resilient
die Teamfähigkeit|team skills
das Durchsetzungsvermögen|assertiveness
die Vollständigkeit|completeness
der Verbrauch|consumption
die Instandhaltung|maintenance
einen Beruf ausüben|to practise a profession
der Einzelhandel|retail
aussagekräftig|meaningful
vorrätig sein|to be in stock
die Bestellung|order
prüfen|to check
vereinbaren|to agree
akzeptabel|acceptable
der Lieferschein|delivery note
vermerken|to note
die Lieferzeit|delivery time
der Vertriebsleiter|sales manager
der Konflikt|conflict
ausweichen|to avoid
die Forderung|demand
fördern|to promote
bestehen auf|to insist on
unglaubwürdig|implausible
das Selbstbewusstsein|self-confidence
schweigen|to remain silent
Stellung beziehen|to take a stand
der Standpunkt|point of view
jemanden in eine Rolle drängen|to push someone into a role
nachgeben|to give in`,
  "Kapitel 9 · Handel international": `die Dienstleistung|service
expandieren|to expand
der Export|export
exportieren|to export
global / lokal|global / local
der Großhandel|wholesale
die Kundenorientierung|customer orientation
der Markt|market
die Marktlücke|market gap
die Nachfrage|demand
die Nachhaltigkeit|sustainability
online / offline|online / offline
die Produktion|production
der Umsatz|turnover
der Umweltstandard|environmental standard
die Währung|currency
der Wechselkurs|exchange rate
die Zielgruppe|target group
die Mimik|facial expression
die Gestik|gestures
der Webauftritt|web presence
jemanden schätzen|to appreciate someone
gut ankommen|to be well received
universell|universal
potenziell|potential
etwas ausgleichen|to balance something
visuell|visual
der Effekt|effect
freizügig|open / liberal
provozieren|to provoke
die Geste|gesture
die Beleidigung|insult
recherchieren|to research
vertikal / horizontal|vertical / horizontal
sich zurechtfinden|to find one’s way
freischalten|to activate
etwas herausfinden|to find something out
der Faktor|factor
bewusst|conscious
berücksichtigen|to take into account
anpassungsfähig|adaptable
etwas umsetzen|to implement something
der Konsument / die Konsumentin|consumer
die Zuwachsrate|growth rate
das Bauteil|component
die Wunschliste|wish list
eine Ware vertreiben|to distribute goods
das Budget|budget
installieren|to install
der Mangel|defect
einen Ablauf darstellen|to illustrate a process
etwas festlegen|to define something
kommentieren|to comment
überarbeiten|to revise
korrigieren|to correct
die Benutzerfreundlichkeit|user-friendliness
die Lesbarkeit|readability
die Konsequenz|consequence
die Mahnung|payment reminder
der Abzug|deduction
im Laufe des Tages|during the day
vor Ort|on site
montieren|to assemble
ausliefern|to deliver
vernetzen|to network
untereinander vernetzt|interconnected
einzigartig|unique
nachhaltig|sustainable
beliefern|to supply
kontinuierlich|continuous
gründlich|thorough
der Einsatz|deployment / commitment
die Zuständigkeit|responsibility`,
  "Kapitel 10 · Rechte und Pflichten": `das Homeoffice|working from home
die Kernzeit|core working hours
die Gleitzeit|flexitime
die Teilzeit|part-time work
die Vollzeit|full-time work
der Notfall|emergency
etwas frei wählen|to choose freely
übrigbleiben|to remain
brutto / netto|gross / net
die Personalabteilung|HR department
der Versicherungsbeitrag|insurance contribution
der Arbeitgeber|employer
die Arbeitgeberin|female employer
der Arbeitnehmer|employee
das Arbeitsverhältnis|employment relationship
die Probezeit|probationary period
die Frist|deadline
kündigen|to terminate
zumutbar|reasonable
die Vergütung|remuneration
die Bruttovergütung|gross remuneration
die Berücksichtigung|consideration
Anspruch haben auf|to be entitled to
etwas abstimmen|to coordinate something
etwas absprechen|to agree on something
die Phase|phase
vertraglich geregelt|regulated by contract
die Tätigkeit|activity
das Gesetz|law
der Tarifvertrag|collective agreement
die Betriebsvereinbarung|works agreement
etwas regeln|to regulate something
die Branche|sector
die Betriebsart|type of business
die Nebentätigkeit|secondary employment
die Kündigung|termination
jemanden einstellen|to hire someone
regulär|regular
etwas anordnen|to order something
verpflichtet sein|to be obliged
die Vertragsdauer|contract duration
der Gruppenleiter|group leader
pünktlich erscheinen|to arrive punctually
eine Lösung finden|to find a solution
die Personalakte|personnel file
der Gewissenskonflikt|conflict of conscience
die Auftragslage|order situation
die Dienstbekleidung|work clothing
anlässlich|on the occasion of
trotz|despite
verpachten|to lease out
die Arbeitsbedingungen|working conditions
die Gruppenleitung|group management
der Tarif|tariff
Urlaub nehmen|to take leave
jemandem droht die Kündigung|someone faces dismissal
die Diskriminierung|discrimination
jemanden entlassen|to dismiss someone
stehlen|to steal
die Belästigung|harassment
jemanden mobben|to bully someone
schwanger sein|to be pregnant
das Mutterschaftsgeld|maternity allowance
der Gesundheitsschutz|health protection
die Ruhezeit|rest period
die Gewerkschaft|trade union
die Schutzbrille|safety goggles
die Einmalhandschuhe|disposable gloves
die Hygiene|hygiene
desinfizieren|to disinfect
die Betriebsversammlung|works meeting`,
  "Kapitel 11 · Arbeit und neue Medien": `digital|digital
anklicken|to click
herunterladen|to download
hochfahren|to boot up
posten|to post
twittern|to tweet
speichern|to save
verzichten auf|to do without
schwerfallen|to find difficult
kommunizieren|to communicate
zurückkehren|to return
deuten|to interpret
sich blamieren|to embarrass oneself
lauschen|to listen
vibrieren|to vibrate
übertragen|to transmit
auf sich selbst gestellt sein|to be left to one’s own devices
kurzfristig|short-term
sich etwas zulegen|to acquire something
scheitern|to fail
in Betrieb nehmen|to put into operation
sich rechtfertigen|to justify oneself
überprüfen|to check
vernetzt|networked
vertraut sein mit|to be familiar with
stammen aus|to originate from
die Untersuchung|study
der Befragte|respondent
die Hälfte|half
das Drittel|third
sich etwas vornehmen|to plan to do something
etwas durchhalten|to persevere
die Umfrage|survey
reklamieren|to complain
die Reklamation|complaint
die Voraussetzung|prerequisite
die Abholung|collection
Bezug nehmen auf|to refer to
in Erfahrung bringen|to find out
in Anspruch nehmen|to make use of
einen Auftrag erteilen|to place an order
einen Fehler beheben|to fix an error
sich in Verbindung setzen|to get in touch
in Betracht kommen|to be considered
bestätigen|to confirm
benachrichtigen|to notify
defekt|defective
einwandfrei|flawless
bedauern|to regret
die Sendung|shipment
umgehend|immediately
der Kostenvoranschlag|cost estimate
andernfalls|otherwise
der Versandhandel|mail-order business
schäumen|to foam
sich wenden an|to contact
der Umtausch|exchange
zur Verfügung stellen|to provide
in Rechnung stellen|to invoice
mithilfe|with the help of
fest angestellt|permanently employed
die Initiativ-Bewerbung|speculative application
das Netzwerk|network
gezielt|targeted
der Aufwand|effort
optimieren|to optimize
in Kontakt bleiben|to stay in touch
veröffentlichen|to publish
zugehen auf|to approach
die Gemeinsamkeit|similarity
der Eindruck|impression
die Überwindung|effort / overcoming
sich lohnen|to be worthwhile
die Umsetzung|implementation
vermischen|to mix
jemanden von einem Plan abbringen|to dissuade someone from a plan`,
  "Kapitel 12 · Global arbeiten und leben": `der Krieg / der Frieden|war / peace
die Verständigung|understanding
die Identität|identity
die Armut / der Reichtum|poverty / wealth
der Klimawandel|climate change
der Sprachbarriere|language barrier
das Menschenrecht|human right
der Austausch|exchange
die Hautfarbe|skin colour
der Rassismus|racism
die Zerstörung|destruction
die Tradition|tradition
das Risiko|risk
der Prozess|process
die Vernetzung|networking
die Kapazität|capacity
die Effizienz|efficiency
zur Verfügung stehen|to be available
der Bruchteil|fraction
das Phänomen|phenomenon
das Material|material
Interesse haben an|to be interested in
die Anstrengung|effort
etwas erarbeiten|to develop something
der Unfallschutz|accident prevention
der Mentor / die Mentorin|mentor
sich scheuen|to hesitate
weiterkommen|to make progress
der Verbesserungsvorschlag|suggestion for improvement
dankbar|grateful
basieren auf|to be based on
der gemeinsame Nenner|common denominator
das Bedürfnis|need
ineinandergreifen|to interlock
der Energieverbrauch|energy consumption
die Haltbarkeit|durability
die Geschäftsführung|management
die Steuerung|control
die Forschung|research
der Datenschutz|data protection
die Gleichstellung|equal treatment
der Arbeitsschutz|occupational safety
die Finanzen|finances
die Arbeitsbedingungen|working conditions
die Urlaubsplanung|holiday planning
die Bürokratie|bureaucracy
die Körpersprache|body language
improvisieren|to improvise
das Mobbing|bullying
der Betriebsrat|works council
einen Termin verschieben|to postpone an appointment
die Vorbereitung|preparation
das Detail|detail
das Gespräch|conversation
erstaunt|astonished
ärgerlich|annoying
sich etwas ausdenken|to think something up
die Betriebsversammlung|works meeting
die Stellungnahme|statement
die Gewerkschaft|trade union
vergüten|to remunerate
etwas ankündigen|to announce something
das Potenzial|potential
jemandem danken|to thank someone
der Ärger|annoyance
informiert|informed
jemanden unfreundlich behandeln|to treat someone unfriendly
etwas besprechen|to discuss something
etwas genehmigen|to approve something
die Koordination|coordination
nachlässig|careless
etwas genau nehmen|to take something seriously
der Titel|title
professionell / unprofessionell|professional / unprofessional
eilig|urgent
etwas untersagen|to prohibit something
ausdrücklich|explicitly
das Zeitalter|era
die Migration|migration
die Trennung|separation
ganz zu schweigen von|not to mention
auseinanderreißen|to tear apart
die Schätzung|estimate
belastend|burdensome
etwas investieren|to invest something
getrennt leben|to live separately
der Freiraum|freedom / space
leiden unter|to suffer from
sich gegenseitig anregen|to inspire each other
die Schiene|track
tendenziell|tending
dominant|dominant
finanziell abhängig|financially dependent
folglich|consequently
infolgedessen|as a result
vielfältig|diverse
die Epoche|epoch`,
  "Kapitel 13 · Konflikte lösen": `alleinerziehend|single parent
in Schicht arbeiten|to work shifts
die Kundenbeschwerde|customer complaint
die Aufstiegsmöglichkeit|promotion opportunity
die Babypause|parental break
der Mutterschutz|maternity protection
die Elternzeit|parental leave
der Meisterkurs|master craftsman course
Teilzeit arbeiten|to work part-time
die Messe|trade fair
sich beruhigen|to calm down
Respekt voreinander haben|to respect one another
ausreden|to let someone finish speaking
jemanden einschalten|to involve someone
Meinungsunterschiede offen austragen|to discuss differences openly
sich etwas bewusst machen|to become aware of something
nachtragend sein|to bear a grudge
jemanden beschäftigen|to employ / occupy someone
das Großraumbüro|open-plan office
der Schichtplan|shift schedule
der Anlass|occasion
jemandem etwas in die Schuhe schieben|to blame someone for something
ankündigen|to announce
Notizen durchlesen|to read through notes
gelassen bleiben|to remain calm
bei Bedarf|if required
unter Druck sein|to be under pressure
etwas an eine Mail anhängen|to attach something to an email
die Rückfrage|follow-up question
etwas nachvollziehen können|to be able to understand something
in einer Krise stecken|to be in a crisis
die Abschlussnote|final grade
gleichaltrig|of the same age
jemandem Chancen verschaffen|to provide someone with opportunities
Wirkung zeigen|to have an effect
Führungsaufgaben übernehmen|to take on leadership tasks
bewusst miterleben|to consciously experience
der Nachwuchs|young talent
die Belastungsprobe|stress test
jemanden vor Herausforderungen stellen|to challenge someone
etwas aushandeln|to negotiate something
der Faktor|factor
die Trendwende|trend reversal
das Modell|model
angewiesen sein auf|to be dependent on
sich qualifizieren für|to qualify for
die Nachwuchskraft|junior employee
verteidigen|to defend
jemandem blind vertrauen|to trust someone blindly
sich verwirklichen|to fulfil oneself`,
  "Kapitel 14 · Weiterbildung": `die Umschulung|retraining
die Pubertät|puberty
die Schwangerschaft|pregnancy
die Weiterbildung|further education
die Gesellenprüfung|journeyman’s examination
die Ausbildungsvergütung|training allowance
mehr als genug|more than enough
sich weiterbilden|to pursue further training
das Weiterbildungsangebot|further training opportunity
etwas erkennen|to recognize something
sich geistig fit fühlen|to feel mentally fit
offensichtlich|obvious
erhalten bleiben|to be preserved
der Rollstuhl|wheelchair
etwas betonen|to emphasize something
Kontakte knüpfen|to make contacts
diszipliniert / disziplinlos|disciplined / undisciplined
sozial|social
tolerant / intolerant|tolerant / intolerant
kämpferisch|combative
kollegial / unkollegial|collegial / uncollegial
mobil|mobile
selbstständig / unselbstständig|independent / dependent
temperamentvoll|temperamental
verantwortungsbewusst|responsible
zäh|tenacious
zielstrebig / ziellos|determined / aimless
stellvertretend|deputy / representative
etwas versäumen|to miss something
die Zelle|cell
die Entlassung|release / dismissal
vermissen|to miss
erwerbstätig|gainfully employed
das Jahreseinkommen|annual income
versteuern|to pay tax on
übersteigen|to exceed
das Anerkennungsverfahren|recognition procedure
Unterstützung erhalten|to receive support
promovieren|to earn a doctorate
forschen|to research
das Stipendium|scholarship
drohen|to threaten
etwas nachweisen|to prove something
sich beraten lassen|to seek advice
zunehmen / abnehmen|to gain / lose weight
das Berufsbild|job profile
sich grundlegend ändern|to change fundamentally
sich wenden an|to contact
Grundkenntnisse erwerben|to acquire basic knowledge
das Arbeitsfeld|field of work
die Fachkraft|skilled worker
die zuständigen Stellen|responsible authorities
beantragen|to apply for
offene Fragen klären|to clarify open questions
die Anreise|journey / arrival
der Anmeldeschluss|registration deadline
die Jahreshälfte|half of the year
aufmerksam machen auf|to draw attention to
ausgleichen|to compensate
der Einfluss|influence
blockieren|to block
intensiv|intensive
die Ergebnisse belegen|to substantiate results
verknüpfen|to link
einschränken|to restrict
differenzieren|to differentiate
signalisieren|to signal
etwas senken / steigern|to lower / increase something
messbar|measurable
etwas verursachen|to cause something
einen Abschluss nachholen|to obtain a qualification later
sich fühlen, als ob|to feel as if
der Wettkampf|competition
innerhalb kürzester Zeit|within a very short time
enorm viel|an enormous amount
der Nutzen|benefit
Nutzen ziehen aus|to benefit from
das Durchhaltevermögen|perseverance
das Mitgefühl|compassion
wirken|to have an effect
depressiv sein|to be depressed`
};

function parse(raw: string, category: string): Card[] {
  return raw.trim().split("\n").map((line, index) => {
    const [de, en] = line.split("|");
    const detail = category === "Irregular verbs"
      ? irregularForms[de]
          ?.replace(/^Präsens:\s*/, "")
          .replace(/\s*·\s*Präteritum:\s*/, ", ")
          .replace(/\s*·\s*Perfekt:\s*/, ", ")
      : undefined;
    return { id: `${category}-${index}`, de, en, category, detail };
  });
}

export const cards: Card[] = [
  ...parse(irregular, "Irregular verbs"),
  ...parse(verbPrep, "Verbs + prepositions"),
  ...parse(adjectivePrep, "Adjectives + prepositions"),
  ...parse(nounPrep, "Nouns + prepositions"),
  ...parse(nounVerb, "Noun–verb combinations"),
  ...Object.entries(chapters).flatMap(([category, raw]) =>
    parse(`${raw}\n${chapterAdditions[category] ?? ""}`.trim(), category)
  ),
];
