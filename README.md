# Augabenstellung
---

Liebe Studierende, im Rahmen des Praktikums „Web Anwendungen 2“ bieten wir
Ihnen eine Aufgabe zur Entwicklung einer dynamischen Web Anwendung mit
Hilfe von Restful WebServices in NodeJS im Backend und der sog. Rich-
JavaScript-Client-Technologie im Frontend (mit jQuery) an.

Die Aufgabe werden im Laufe des Semesters in mehreren Schritten bearbeitet
und reichen von der Erstellung eines Geschäfts-Vorschlages, der das Vorhaben
aus der Anwendungsperspektive beschreibt über Mockup sowie Prototypen bis
zur Fertigstellung der funktionsfähigen Anwendung hin.

Konkret sind folgende Schritte vorgegeben:

---
1. Geschäftsvorschlag sowie grafischer Prototyp, Abgabe bis 20.10.2025, 19 Uhr

  Erstellen Sie eine Power-Point Präsentation, welche die zu entwickelnde Anwendung aus der Anwendungs- und die Planungsperspektive beschreibt.
  Ein Geschäftsvorschlag soll die folgenden Aspekte beleuchten:
  - Projektvorstellung, Motivation, Intention
  - Zieldefinition mit Festlegung der Qualitätskriterien
  - Abschätzung des Projektumfangs und der Realisierbarkeit, also die Ressourcen- und Risikoabschätzung
  - Organisationsplanung mit zeitlichem Horizont (GANTT-Diagramm) Der grafische Prototyp (sog. MockUp) ist ein mit beliebigen Mitteln 
    (GIMP, Photoshop, ein Mock-Up Tool oder ein Vektor-Grafik-Programm) erstelltes Modell der grafischen Benutzeroberfläche, 
    also eine Darstellung von jeweiligen Browser-Fenstern, die der Benutzer nach seinen diversen Aktionen (Button-Klicks, Formular-Eingaben etc.)
    sehen wird. Ein hoher Detaillierungsgrad der Darstellung ist erforderlich, da der grafische Prototyp als eine Diskussionsbasis für die
    Ermittlung der Anforderungen an die zu entwickelnde Software dient.

---
2. HTML/CSS -Prototyp, Abgabe bis 03.11.2025, 19 Uhr
   
  Der HTML/CSS Prototyp ist eine idealerweise 1:1 Umsetzung (bzw. eine Erweiterung)
  des grafischen Prototyps aus Schritt 1 mithilfe von HTML und CSS.
  Es handelt sich dabei um eine „statische“ Webseite.

  - Wichtig!!!:
    Sie soll vollständig alle HTML-Dokumente enthalten,
    welche die Ergebnisse der einzelnen Klicks des Benutzers darstellen.
    Da die "statische" Webseite keinen Zugriff auf eine Datenbank hat,
    sollen im HTML-Code die Beispiel-Daten (Fake-Daten),
    die aus einer Datenbank eingelesen werden könnten, „hard“ hinterlegt werden.
    Solch ein Prototyp umfasst nachher mehr HTML Dateien,
    wie eine dynamische Web Anwendung, dies lässt sich aber nicht vermeiden.

---
3. Dynamischer Prototyp, Abgabe bis 01.12.2025, 19 Uhr
   
  Ein bis zwei beliebige Formulare oder interaktive Teile aus ihrem HTML-Prototyp
  (z.B. das Formular zum Benutzer-Registrieren, die Darstellung von Artikeln oder eine Seite zum Produkt-Konfigurieren) 
  - Beispielhaft: Ein Formular in Ihrem Frontend soll mithilfe von JavaScript- bzw. JQuery-Funktionen eine 
    REST-Schnittstelle auf dem Server ansprechen, dieser die Daten senden um die Daten dann schlussendlich in der Datenbank zu speichern.
  - Oder der umgekehrte Weg, das Backend (Serveranwendung mit Datenbank, kurz API)
    wird vom Frontend aufgerufen, Daten werden angefordert und im 
    Frontend dann dargestellt durch die Erzeugung von dynamisch erstelltem HTML – Code

---
4. Final Release, Abgabe bis 12.01.2026, 19 Uhr
   
  Alle HTML-Dokumente aus dem ursprünglichen HTML/CSS - Prototyp
  (siehe Schritt 2) sollen nach dem Vorbild des dynamischen Prototyps (Schritt 3)
  „dynamisch“ implementiert werden. 
  Heißt, alle Seiten des Prototyps, welche Daten aus dem Backend darstellen oder diesem übergeben sind komplett implementiert,
  alles ist getestet und arbeitet fehlerfrei sowie der gesamte Funktionsumfang aus dem Geschäftsvorschlag ist umgesetzt.

---
Rahmenbedingungen: Sie sollen Client-seitig nur HTML, CSS, JavaScript, JQuery und Bootstrap 4 verwenden.
Keine Weitere Technologien sind zulässig. Die Serverseite ist gegeben und kann bei Bedarf geändert werden.
Nicht aber eigenständig durch andere Techniken ersetzt werden. 
Heißt hier ist mit NodeJS ein Express Webserver umgesetzt, in welchem die Restful-API läuft. 
Die zur Verfügung gestellte API soll von Ihnen verwendet werden.
Diese stellt einen umfassenden lauffähigen Grundgerüst mit implementierten REST-Services und Datenbankzugriff dar, 
sodass es in der Regel nur minimale Abänderungen durch die Studierenden erforderlich sind.
Sollten Änderungen notwendig werden aufgrund Ihrer Datenstrukturen bzw.
Ihrer gewünschten Funktionen müssen Sie diese in der API vornehmen.
Die Client-Seite soll vollständig implementiert werden.
Als Datenbank ist nur eine SQLITE Datenbank zulässig.
Beim Release soll eine eigene NodeJS Instanz gestartet werden für das Frontend.
Die API läuft von sich aus schon in einer eigenen Instanz.
In der freien Wildbahn befinden sich meist beide Teile nie auf der selben Maschine sondern sind verteilt.
Im Praktikum simulieren wird dies indem beide Instanzen an unterschiedlichen Ports arbeite.
Sowohl der Server als auch der Client-Teil Ihrer Webanwendung können damit auf demselben Rechner arbeiten und sind erreichbar.