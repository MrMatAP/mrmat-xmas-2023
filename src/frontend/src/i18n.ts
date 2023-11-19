//
// i18n

import { createI18n } from 'vue-i18n'


export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            errorHeader: "Everything is fine... not",
            errorMessages: {
                unknown: "Something happened but we don't exactly know what it was. Try again later.",
            },
            serverNotFound: 'The backend server did not find the requested information',
            serverDidNotAnswer: 'The backend server did not respond while preloading',
            identityNotFound: 'Unknown Identity',
            main_my_analogue_engineering: 'My analogue engineering challenge for you this year is to build <a href="http://www.origami-instructions.com/origami-modular-toshies-jewel.html">Toshie\'s Jewel</a> ' +
                'from the three <a href="https://en.m.wikipedia.org/wiki/Sonobe">Sonobe units</a> that I\'m sending along. You will ' +
                'recognise the shape of a Sonobe unit on the bottom left of the picture below, the intermediate unwrapped stage on ' +
                'the bottom middle and the completely folded Toshies Jewel on the bottom right. You can use the completed Jewel to ' +
                'wrap a small present or attach a string to hang it up somewhere.',
            main_sonobe_units_are: 'Sonobe units are some of the basic building blocks of <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a>. ' +
                'You may decide to expand on this challenge by folding additional Sonobe units to construct more elaborate models, as ' +
                'shown in the upper half of the picture. The numbers next to the model correspond to the Sonobe units you ' +
                'need for the model. Sonobe units are not difficult and quick to fold, but consider recruiting your friends and ' +
                'family to fold them for you ;o)',
            feedback_send_me: 'Send me a message',
            feedback_whatever_you_do: 'Whatever you do, take a picture of yourself and the result and upload it here along with a message how annoying it ' +
                'was for you to put it together. It will only be shared with me alone.',
            feedback_send_button: 'Send',
            making_of_header: 'I\'ve started to make Christmas cards for my friends and family back when we lived in Singapore. ' +
                'I wanted to do something creative that the recipients might ' +
                'not dispose of right after the holiday period is over and also involving technologies I came across in the past year. ' +
                'I generally take the opportunity to do some learning as I come up with this. Not everything involved with this card ' +
                'is readily visible, so what follows is some background to highlight what may not entirely be visible, starting ' +
                'from when you open the envelop containing it.',
            making_of_card_title: 'The card itself',
            making_of_card: 'The card itself is regular paper you can in any stationery shop. But the writing is done with ' +
                '<a href="https://www.jetpens.com/Uni-ball-Signo-Noble-Metal-Metallic-UM-120NM-Gel-Pen-8-Color-Bundle/pd/23873">Uni-ball Signo Metal Metallic UM-120NM Gel Pens</a>, ' +
                'which I purchased in the <a href="https://hands-singapore.com.sg/">Tokyu Hands</a> Paya Lebar outlet back in Singapore. ' +
                'I really miss the availability of Japanese stationery, not only for its incredible variety but also for its incredible ' +
                'sophistication. While not used for this particular card, this specifically applies to <a href="https://youtu.be/PESa3Du3udY?si=XJn_adgbOAzLZOkH">over-engineered Japanese mechanical pencils</a>. ' +
                'I have a rather large collection of those and pick a new one every day to make notes at work with.',
            making_of_sonobe_title: 'The Sonobe Units',
            making_of_sonobe_1: 'I sent out a custom Lego model in 2022 and that clearly was a resounding success. But I didn\'t want to do this ' +
                'again (expensive, as well as been-there-done-that) and also <a href="https://www.lego.com/de-ch/product/wintertime-polar-bears-40571">Lego itself (!) copied my idea in 2023</a>, ' +
                'although my set was way, way better.',
            making_of_sonobe_2: 'On a short trip to Fredrikstad in southern Norway late summer, I was reading <a href="https://en.wikipedia.org/wiki/Children_of_Time_(novel)">Adrian Tchaikovsky\'s Children of Time</a>,' +
                'an excellent book in which <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modular Origami</a> is briefly mentioned.',
            making_of_sonobe_3: 'Modular Origami is intriguing because it combines the classic art of Origami with the art of Engineering. Of course there ' +
                'is still no glue involved but you can construct a wide range of new models with more than one piece of\n' +
                'paper and it thereby receives interesting mathematical, geometric and architectural properties, which all relate to\n' +
                'my day job.',
            making_of_sonobe_4: 'The three Sonobe Units I\'ve sent you are just one kind of modular unit and I encourage you to <a href="https://www.google.com/search?q=modular+origami&sca_esv=583745314&tbm=isch&sxsrf=AM9HkKkXJ_uPM4G2xBeZAYguwEnbV16PsA:1700388232484&source=lnms&sa=X&ved=2ahUKEwjh_s7k58-CAxUXyQIHHTPtCFsQ_AUoAXoECAMQAw&biw=1652&bih=1294&dpr=1">google</a> what else you can construct. ' +
                'Sonobe Units are particularly useful to construct geometric forms, particularly suiting polyhedra with equilateral triangular faces. ' +
                'They are flat parallelograms with 45 and 135 degree angles, divided by creases into two diagonal tabs and two corresponding pockets. ' +
                'Combining the three I\'m giving you will result in a hexahedron, colloquially called \'Toshies Jewel\'. If you spend ' +
                'an evening folding 30 Sonobe units, you can build the <a href="https://en.wikipedia.org/wiki/Triakis_icosahedron">triakis icosahedron</a>, ' +
                'which looks very, very appropriate for the time of year.',
            making_of_nfc_1: 'I needed to lead you to the digital component of my card (what you\'re reading here) and, in order to greet you ' +
                'by your name, I need to know who you are. The normal way of doing this to ask you to authenticate but I\'m sure you ' +
                'don\'t want to remember yet another password for my Christmas card, of all things. I could have federated any sort ' +
                'of identity you may already have (Google, Facebook/Insta, TikTok or whatever) but that felt iffy.',
            making_of_nfc_2: 'So not only did I not want you to have to type in some URL from the card, I also needed to relay some identity. In ' +
                'the past I used to print out <a href="https://en.wikipedia.org/wiki/QR_code">QR-Codes</a> which you get to see ' +
                'everywhere these days. This time I went for <a href="https://en.wikipedia.org/wiki/Near-field_communication">NFC tags</a>. ',
            making_of_nfc_3: 'The NFC tag you held your phone or tablet against is the most common application for Near-field Communication, ' +
                'leading to a customised URL containing a unique code that identifies you. That code is then verified whether I ' +
                'actually do know you and that yields your identity. If I don\'t have you registered you\'re led to a page wishing ' +
                'you a happy holiday as a stranger. This sort of "code authentication" is clearly not enterprise grade, but it\'ll ' +
                'do for my Christmas card just fine and it saves us all from yet another password that, apart from being annoyed, ' +
                'no doubt you\'d forget next year.',
            making_of_nfc_4: 'There are way more things that you can do with NFC tags than this and I also find them a lot more convenient than ' +
                'QR Codes. There are quite a number of competing standards, not the least of which one that you would use when ' +
                'checking in to your local public transport (typically <a href="https://en.wikipedia.org/wiki/FeliCa">Felica</a> ' +
                'or the one that you would use for contactless payments. You can use them for access tokens, to join your wireless ' +
                'and exchange identities and contacts. NFC tags are fairly cheap and I can see some further interesting uses. ' +
                'However, it is unfortunate that very quickly you will need to actually write some mobile app to make use of them ' +
                'and as we all know the producers of mobile phones tend to be rather restrictive to do that (principally looking ' +
                'at you, Apple).',
            making_of_frontend_title: 'The front-end',
            making_of_frontend_1: 'I really struggle writing frontends and the one you\'re looking at really was no exception. It\'s not the asynchronicity ' +
                'and event-drivenness of user interfaces, I get all that. But I have a real distaste for the chaos that is JavaScript ' +
                'with its myriad of special cases that entirely defy logic for me. Sure, you will tell me that it\'s just a number of ' +
                'things you just have to know but frankly I just can\'t be bothered.',
            making_of_frontend_2: 'It is for that reason that I chose <a href="https://www.typescriptlang.org/">TypeScript</a> and <a href="https://vuejs.org/">Vue</a> ' +
                'this time to just make this a tiny little bit better for myself. TypeScript makes sense to me as someone coming ' +
                'from the back-end because it at least reports the most egregious traps I might fall into. Vue makes sense with its ' +
                'encapsulation of styles, code and template in its Vue components. I still spent way, way too much on the front-end cursing ' +
                'web browsers for their limitations and unpredictability when it comes to placing things where I want them to be ' +
                'and making that legible and responsive (you can\'t make assumptions about what device people look at your site with ' +
                'what screen size. I could have used any of the many responsive CSS UI frameworks, but I didn\'t.',
            making_of_frontend_3: 'It\'s a lot more complicated than you think to make text legible, regardless of what medium. I have quite a bit of ' +
                'experience producing content I need its consumers to understand but the design for that to be legible on a screen ' +
                'is a science on its own. This goes way beyond just showing a picture here and there and has a lot to do with the ' +
                'classic art of typography. If you look closely at the styles definition of the text here, you will find that its size, ' +
                'line-height, number of words and even the text color are dynamically calculated to optimise legibility.',
            making_of_frontend_4: 'Not everyone I send this to is a native English speaker so there is internationalisation based on your identity. It ' +
                'was also very important to me that the front-end is aware of its build-time version.',
            making_of_frontend_5: 'The color-scheme is used on this site consists of ',
            making_of_backend_title: 'The back-end',
            making_of_backend_1: 'The back-end is a fairly simple Python application using <a href="https://fastapi.tiangolo.com/">FastAPI</a>, ' +
                'hosted as an Azure WebApp. FastAPI generally makes a lot of sense to me because it follows my preferred code-first ' +
                'method of producing APIs and very nicely produces an OpenAPI spec based on the decorators it provides. The Python ' +
                'app here is deliberately not as modularised as I would usually write it in a professional context.',
            making_of_backend_2: 'I\'ve made the decision to have the back-end serve the front-end early on and you will find that the build mechanism ' +
                'described in the <a href="https://github.com/MrMatAP/mrmat-xmas-2023">mrmat-xmas-2023 repository</a> that produces ' +
                'all this will integrate the separate builds for back- and front-end. This saves me some (small) cost hosting this, ' +
                'but it\'s also the way I like it.',
            making_of_backend_3: 'Most modern front-ends are <a href="https://en.wikipedia.org/wiki/Single-page_application">Single Page Applications (SPA)</a> ' +
                'and the one you\'re looking at is no different. Classic web applications load each page you open in a browser separately, ' +
                'SPAs do the same in the background without a "reload". One exception: When you authenticate to the SPA with a ' +
                'modern authentication system then there are typically two redirections, first to a page controlled by the authentication ' +
                'system and then, if authenticated back to the page from where you came from. You\'re all doing this multiple times a day ' +
                'even if you don\'t notice it anymore and it\'s also not a problem, except when you have to do this with a front-end that ' +
                'is served by its own back-end application ;o). It all gets a bit complicated then because the back-end needs to ' +
                'respond for what really the front-end should process on its own. There are many ways to deal with that but all of ' +
                'them are ugly. It\'s the price for being thrifty.',
            making_of_backend_4: 'Azure WebApps have the most annoying habit of wanting to re-compile/re-package what you deliver it from source. I ' +
                'truly dislike that and want to give it just the final product to serve. I found it took quite a bit of convincing ' +
                'the Microsoft tools to do this for me, but I\'m glad I did because it\'s what I totally would want in a professional ' +
                'context. As with many other things Microsoft, I find them almost good. Their documentation is severely lacking and ' +
                'their examples work for the simple use-cases they were thinking of. The moment you\'re just outside of that you\'ll ' +
                'be looking through their code. That\'s actually okay, but they\'re not helping themselves with inconsistent API ' +
                'documentation. Some things, such as the instrumentation of Python for telemetry, also plainly do not work.'
        },
        de: {
            errorHeader: 'Alles ist gut... oder eben auch nicht',
            errorMessages: {
                unknown: "Da ist etwas passiert aber wir wissen nicht genau was. Probiers später nochmal.",
            },
            serverNotFound: 'Der server konnte keine Information finden',
            serverDidNotAnswer: 'Der server hat uns nicht geantwortet',
            identityNotFound: 'Unbekannte Identität',
            main_my_analogue_engineering: 'Dieses Jahr ist meine analoge Engineering-Aufgabe für Dich aus den drei <a href="https://en.m.wikipedia.org/wiki/Sonobe">Sonobe Einheiten</a> ' +
                '<a href="http://www.origami-instructions.com/origami-modular-toshies-jewel.html">Toshie\'s Edelstein</a> zu bauen. ' +
                'Im Bild unten links erkennst Du eine der mitgelieferten Sonobe Einheiten, das Zwischenergebnis unten in der Mitte und den fertigen Toshie\'s Edelstein unten rechts. ' +
                'Du kannst diesen dann benutzen um ein kleines Geschenk einzupacken oder mit einem Faden irgendwo aufhängen.',
            main_sonobe_units_are: 'Sonobe Einheiten sind die Grundsteine von <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modularem Origami</a>. ' +
                'Du kannst dich entscheiden diese Aufgabe zu erweitern in dem Du mehr von diesen Sonobe Einheiten selber faltest um komplexere Modelle zu bauen, ' +
                'wie in der oberen Hälfte des Bildes. Die Zahlen neben dem Modell entsprechen der Anzahl der Sonobe Einheiten welche Du für das Modell ' +
                'benötigst. Sonobe Einheiten sind nicht schwierig und schnell zu falten, aber ich schlage vor Deine Freunde und Familie dazu zu bringen Dir zu helfen ;o)',
            feedback_send_me: 'Schicke mir eine Nachricht',
            feedback_whatever_you_do: 'Egal wie es rauskommt, mach ein Foto von Dir und dem Resultat, dann lade es hier ' +
                'mit einer Nachricht hoch wie fies das diese Aufgabe war. Nur ich werde das Foto und die Nachricht bekommen.',
            feedback_send_button: 'Abschicken',
            making_of_header: 'Ich fing an Weihnachtskarten für meine Freunde und Familie zu machen als wir noch in Singapur lebten. ' +
                'Ich wollte etwas kreatives tun was die Empfänger nach der Weihnachtszeit nicht gleich ins Altpapier werfen und dabei ' +
                'interessante Technologien welchen ich übers Jahr hinweg über den Weg lief dabei benutzen. Ich nehme mir dies generell ' +
                'zur Gelegenheit Neues zu lernen. Nicht alles davon ist so einfach sichtbar, deshalb folgt hier etwas Hintergrund beginnend ' +
                'zum Zeitpunkt wo ihr den Umschlag aufgemacht habt.',
            making_of_card_title: 'Die Karte',
            making_of_card: 'Die Karte selbst ist ganz normales Papier das Du in jeder Papeterie kaufen kannst. Geschrieben habe ich aber mit ' +
                '<a href="https://www.jetpens.com/Uni-ball-Signo-Noble-Metal-Metallic-UM-120NM-Gel-Pen-8-Color-Bundle/pd/23873">Uni-ball Signo Metal Metallic UM-120NM Gel Pens</a>, ' +
                'welche ich damals noch im <a href="https://hands-singapore.com.sg/">Tokyu Hands</a> in Paya Lebar gekauft habe. ' +
                'Ich vermisse Japanische Papeterie, nicht nur weil sie so unglaublich diversifiziert ist sondern auch weil sie so ' +
                'raffiniert ist. Das trifft insbesondere auf <a href="https://youtu.be/PESa3Du3udY?si=XJn_adgbOAzLZOkH">über-entwickelte Japanische Druckbleistifte</a> zu, ' +
                'von welchen ich eine grosse Sammlung habe aus der ich täglich einen auswähle.',
            making_of_sonobe_title: 'Die Sonobe Einheiten',
            making_of_sonobe_1: 'In 2022 hatte ich ein eigenes Lego Modell und das war sehr erfolgreich. Dieses Jahr wollte ich das nicht wieder tun (teuer und been-there-done-that). ' +
                'Ausserdem bemerkte ich dass <a href="https://www.lego.com/de-ch/product/wintertime-polar-bears-40571">Lego meine Idee kopiert hat</a>, aber mein Modell war bedeutend besser.',
            making_of_sonobe_2: 'Auf einer kurzen Reise nach Fredrikstad in den Süden von Norwegen las ich <a href="https://en.wikipedia.org/wiki/Children_of_Time_(novel)">Adrian Tchaikovsky\'s Children of Time</a> ' +
                'ein exzellentes Buch in welchem beiläufig <a href="https://en.m.wikipedia.org/wiki/Modular_origami">Modulares Origami</a> erwähnt wird.',
            making_of_sonobe_3: 'Modulares Origami ist spanned weil es die klassische Origami Kunst mit Engineering verbindet. Natürlich darf weiterhin kein Leim verwendet werden aber man kann ' +
                'viel grössere neue Modelle mit mehr als nur einem Stück Papier damit konstruieren. Origami erhält dadurch ganz neue interessante mathematische, geometrische und architektonische Aspekte ' +
                'welche sich alle in meiner täglichen Arbeit wieder finden.',
            making_of_sonobe_4: 'Die drei Sonobe Einheiten die ich euch schicke sind nur eins von mehreren modularen Einheiten und ich empfehle zu <a href="https://www.google.com/search?q=modular+origami&sca_esv=583745314&tbm=isch&sxsrf=AM9HkKkXJ_uPM4G2xBeZAYguwEnbV16PsA:1700388232484&source=lnms&sa=X&ved=2ahUKEwjh_s7k58-CAxUXyQIHHTPtCFsQ_AUoAXoECAMQAw&biw=1652&bih=1294&dpr=1">googlen</a> ' +
                'was man sonst noch damit bauen kann. Sonobe Einheiten sind speziell nützlich um geometrische Formen zu bauen, typischerweise Polyhedren mit gleichseitig-dreieckigen Flächen. ' +
                'Es sind flache Parallelogramme mit 45 und 135 Grad Winkeln welche beidseitig diagonale Taschen haben um sich gegenseitig zu kombinieren. ' +
                'Alle drei zusammengebaut werden zu einem Hexahedron welches in diesem Kontext "Toshies Edelstein" genannt wird. ' +
                'Wenn ihr einen Abend damit verbringt 30 Sonobe Einheiten zu falten könnt ihr ein <a href="https://en.wikipedia.org/wiki/Triakis_icosahedron">Triakis Icosahedron</a> ' +
                'bauen, welches besonders gut in diese Jahreszeit passt.',
            making_of_nfc_1: 'Um euch auf die digitale Komponente meiner Karte zu führen (was ihr hier lest) und um euch hier mit eurem Namen zu begrüssen ' +
                'muss ich wissen wer ihr seid. Der normale Weg um das zu tun ist euch nach einem Passwort zu fragen aber ich bin mir sicher dass ihr euch nicht noch an ein ' +
                'weiteres erinnern wollt. Speziell nicht für eine blöde Weihnachtskarte. Ich hätte alle möglichen anderen Systeme federieren können welche ihr schon habt ' +
                '(Google, Facebook/Insta, TikTok, etc), aber das fühlte sich nicht gut an',
            making_of_nfc_2: 'Ich wollte nicht nur dass ihr keine Web-addresse von Hand eintippen müsst, ich musste auch einen Weg finden eure Identität zu übertragen. ' +
                'In der Vergangenheit habe ich das vielfach mit <a href="https://en.wikipedia.org/wiki/QR_code">QR-Codes</a> getan, welche ihr heutzutage überall seht. ' +
                'Diesesmal habe ich mich für <a href="https://en.wikipedia.org/wiki/Near-field_communication">NFC tags</a> entschieden.',
            making_of_nfc_3: 'Das NFC tag an welches ihr eurer Telefon oder Tablet gehalten habt um zu dieser Seite zu kommen ist die am meisten genutzte Funktion für Near-field communication. ' +
                'Die URL auf dem tag beinhaltet einen eindeutigen code der euch identifiziert. Diese code wird dann verifiziert ob ihr mir bekannt seid und das führt zu eurer Identiät. Wenn ich ' +
                'euch nicht registriert habe dann landet ihr auf einer Seite welche einem Unbekannten frohe Feiertage wünschen. Diese Art von "Code Authentication" ist natürlich nicht für professionelle ' +
                'Einsätze gedacht aber gut genug für meine Weihnachtskarte und sie verhindert dass wir alle uns nochmal ein Passwort merken müssen welches ihr alle bis nächstes Jahr vergessen habt.',
            making_of_nfc_4: 'Es gibt ein grosse Menge mehr was man mit NFC tags tun kann und ich finde sie auch bedeutend einfacher als QR Codes. ' +
                'Es gibt einige Standards, viele davon für den öffentlichen Verkehr (typisch ist <a href="https://en.wikipedia.org/wiki/FeliCa">Felica</a>) ' +
                'oder auch bei kontaktlosem Bezahlen. Man kann NFC für access tokens benutzen, um sich bei seinem Wifi anzumelden und auch um Kontakte auszutauschen. ' +
                'NFC tags sind nicht teuer und ich kann mir einige andere interessante Anwendungsbereiche vorstellen. ' +
                'Unglcklicherweise benötigen die interessanteren Bereiche ziemlich schnell eine App und wir wissen alle dass die ' +
                'Hersteller der bekannten Systeme sich schwer mit solch experimentellen Dingen tun.',
            making_of_frontend_title: 'Die Webseite',
            making_of_frontend_1: 'Ich habe kein Talent fr Web Programmierung und was ihr hier seht ist keine Ausnahme. ' +
                'Das Problem ist nicht dass Benutzerschnittstellen asynchron und Ereignis-basiert sind, dsa verstehe ich alles. Aber ich finde das ' +
                'Chaos welches Javascript mit seinen vielen Ausnahmen und Spezialitäten verursacht ganz fürchterlich. Sicher werdet ihr mir sagen dass es nur ' +
                'ein paar spezielle Dinge sind die man einfach wissen muss but ganz ehrlich, mein Leben ist zu kurz.',
            making_of_frontend_2: 'Ich habe deshalb diesesmal <a href="https://www.typescriptlang.org/">TypeScript</a> und <a href="https://vuejs.org/">Vue</a> benutzt ' +
                'um das alles ein wenig einfacher zu machen. TypeScript macht Sinn für mich als jemand der aus dem Back-end kommt weil es die schlimmsten JavaScript-Fehler ' +
                'die ich machen könnte wenigstens meldet. Vue macht Sinn für mich mit seiner Kapselung von Design, Code und Struktur in seinen Vue Komponenten. Ich habe ' +
                'trotzdem viel zu viel Zeit mit diesem Front-End verbracht und dabei alle Web-Browser mit ihrer Unvorhersehbarkeit verflucht. Man kann keinerlei Annahme machen ' +
                'wo irgendwelche Elemente platziert werden und mit welchen Geräten ihr die Seiten anschauen werdet. Ich hätte dafür eines der vielen CSS frameworks benutzen können, ' +
                'habe aber nicht.',
            making_of_frontend_3: 'Es ist bedeutend komplizierter als ihr meint Text lesbar zu machen, egal auf welchem Medium. Ich habe einiges an Erfahrung wie man den Inhalt ' +
                'von Texten gestaltet damit er verstanden wird, aber das Design um das ganze dann auf einem Bildschirm lesbar zu machen ist eine Wissenschaft für sich. Es geht bedeutend ' +
                'weiter als einfach hier und da noch ein Bild zu zeigen und hat eine grosse Menge mit klassischer Typographie zu tun. Wenn ihr euch die CSS-Stile auf dieser Seite genauer anschaut ' +
                'werdet ihr bemerken dass die Grösse, Linienhöhe, Anzahl Worte pro Zeile und sogar die Text-Farbe dynamisch für optimale Lesbarkeit berechnet werden.',
            making_of_frontend_4: 'Nicht jeder dem ich dies hier schicke spricht Deutsch, deshalb ist der gesamte Text hier internationalisiert basierend auf einem Attribut eurer Identität. Es war mir ' +
                'ebenso wichtig dass das front-end seine version kennt (und zwar dynamisch).',
            making_of_frontend_5: 'Das Farb-schema welches hier benutzt wird ist ',
            making_of_backend_title: 'Die App im Hintergrund',
            making_of_backend_1: 'Die App ist eine relative einfach Python Applikation welche das <a href="https://fastapi.tiangolo.com/">FastAPI</a> framework benutzt, installiert in einer Azure Webapp.' +
                'FastAPI macht generell grossen Sinn für mich weil es meine bevorzugten Code-First Methode unterstützt und dabei sehr hübsch eine OpenAPI Spezifikation via seine Decorator-Funktionen erstellt. ' +
                'Die Python App hier ist absichtlich nicht so modularisiert wie ich sie in professionellem Umfeld schreiben würde.',
            making_of_backend_2: 'Ich habe mich sehr früh dafür entschieden dass die Hintergrund-App auch gleich die Webseite zur Verfügung stellen soll und ihr könnt das im Mechanismus sehen welcher das ganze ' +
                'Konstrukt als <a href="https://github.com/MrMatAP/mrmat-xmas-2023">mrmat-xmas-2023 repository</a> baut. Das spart mir (ein wenig) Kosten und es ist auch so wie ich es haben möchte.',
            making_of_backend_3: 'Die meisten modernen Webapps sind sogenannte <a href="https://en.wikipedia.org/wiki/Single-page_application">Single Page Applications (SPA)</a> ' +
                'und was ihr hier seht ist genau so eine. Klassische Webapps laden jede Seite einzeln, SPAs tun dies im Hintergrund ohne einen "Reload". Eine Ausnahme gibt es: ' +
                'Wenn ihr moderne Authentifizierung benutzt dann gibt es normalerweise zwei Umleitungen, zuerst zu einer Seite welche vom Authentifizierungs-System kontrolliert wird und dann zurück zur Seite wo ihr herkamt.' +
                'Ihr tut das alles mehrmals täglich und wahrscheinlich bemerkt ihr es gar nicht mehr. Es ist auch normalerweise gar kein Problem, ausser ihr serviert eure moderne Webapp gleich auch von eurer Hintergrund-App.' +
                'In diesem Falle wird leider alles etwas kompliziert weil die Hintergrund-App dann für Dinge antworten muss für welche eigenlich die Webseite etwas tun sollte. Es gibt eine ganze Menge von Möglichkeiten um ' +
                'damit umzugehen aber alle sind hässlich. Es ist der Preis dafür sparsam zu sein.',
            making_of_backend_4: 'Azure WebApps hat die nervige Angewohnheit dass es immer gerne Code neu kompiliert/packetiert wenn man ihn anliefert. Ich hasse das und möchte einfach nur ein fertiges Produkt liefern. Es ist gar ' +
                'nicht einfach die Microsoft Tools davon zu überzeugen dass das was man hier lieft schon fertig ist aber ich bin froh dass ich gefunden habe wie das zu tun ist denn es ist genau das was ich in einem professionellen Kontext ' +
                'auch tun muss und will. Aber auch in anderen Bereichen ist Microsoft wie üblich "fast gut". Die Dokumentation lässt immer viel zu wünschen übrig und ihre Beispiele funktionieren für genau die simplen Fälle die ' +
                'sie sich selbst überlegt haben. Sobald Du nur einen kleinen Schritt aus ihrer Welt machst tauchst Du ganz schnell in ihren Code ein. Das ist üblicherweise nicht ein Problem aber sie helfen sich nicht mit ihrer Inkonsistenz. ' +
                'Manche Dinge, wie beispielsweise die Instrumentierung von Python für Telemetrie funktionieren überhaupt nicht.'
        }
    }
})
