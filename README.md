# blockchain-hotel
Aplikacija susideda iš trijų komponentų - Front-end'o, Back-end'o (kuris mūsų atveju veikia front-end'e) ir Smart Contract'o.

Front-end'o struktūrai ir stilizavimui naudojome HTML5, CSS3, SASS, logikai - Javascriptą. Taip pat naudojome Materialize UI karkasą, kuris palengvino formų bei dialogų kūrimo procesą.

Back-end'ui sukurti naudojome Javascript'ą kuris, kaip minėjome, sukasi vartotojo naršyklėje. Šio sistemos komponento pagrindinė funkcija yra užtikrinti komunikaciją tarp front-end'o ir Smart Contract'o.

Smart Contract'o kūrimui naudojome Solidity, kuris veikia lokaliame Ethereum tinkle. Smart Contract'ui įgyvendinti buvo pasitelkta Truffle kūrimo aplinka, padėjusi sukompiliuoti kontraktą bei parašyti testus.

Testų rezultatai:
![Test results](https://i.imgur.com/WAGfyyH.png)


Verslo planas:
- Sistemos administratorius užpildo blockchain'ą su galimais viešbučiais (mūsų atveju - viešbučio kambariais).
- Sistemos naudotojas pasirenka kambarį už tam tikrą ir pasirenka norimą rezervacijos datą.
- Patvirtinus rezervaciją atliekamas mokėjimas, po kurio norima data išsaugoma blockchain'e.

Aplikacijos pasileidimo instrukcijos :
1) Atsiklonuokite repozitoriją.
2) Įsirašykite Metamask papildinį jūsų pasirinktoje naršyklėje.
3) Įsidiekite Ganache aplikaciją ir pasileiskite testinį blockchain'ą lokaliame tinkle.
4) Prijunkite pirmąją testinę paskyrą iš Ganache prie Metamask papildinio.
5) Repozitorijos aplanko viduje atsidarius bash terminalą rašykite `npm install`.
6) Toliau rašykite `npm run dev` ir aplikacija pasileis jūsų naršyklėje lokaliame tinkle.
