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
            making_of_frontend: '',
            making_of_backend: '',
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
            making_of_frontend: '',
            making_of_backend: '',
        }
    }
})
