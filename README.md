# Baccanale

Archivio digitale non ufficiale dei menu del Baccanale di Imola. L'app raccoglie i ristoranti e i menu delle varie edizioni, permette di esplorare un anno alla volta e offre una scheda dedicata per ogni ristorante con lo storico dei menu pubblicati.

## Cosa fa

- reindirizza la home all'edizione piu recente disponibile
- mostra un archivio per anno con tema dell'edizione
- filtra i ristoranti per testo, localita e ordinamento
- genera una pagina per ogni ristorante aggregando i menu di tutti gli anni in cui compare
- usa dati locali in JSON, senza dipendenze da API esterne a runtime

## Stack

- Next.js 16 con App Router
- React 19
- TypeScript
- Tailwind CSS 4

## Struttura dell'app

### Route principali

- `/` -> reindirizza all'ultima edizione disponibile
- `/year` -> reindirizza all'ultima edizione disponibile
- `/year/[year]` -> catalogo dei ristoranti per una singola edizione
- `/restaurant/[slug]` -> pagina del ristorante con menu raggruppati per anno

### Dati

I dati sorgente vivono in `app/data/` come file JSON annuali, ad esempio `data-2025.json`. Ogni file contiene i ristoranti dell'edizione, con informazioni anagrafiche e lista dei menu.

La logica di normalizzazione e accesso ai dati e centralizzata in `app/lib/baccanale.ts`, che:

- importa tutti i dataset annuali
- costruisce l'elenco degli anni disponibili
- normalizza i record in tipi TypeScript condivisi
- genera slug e indici per anno e per ristorante
- espone filtri, ordinamenti e formatter usati dalle pagine

## Sviluppo locale

Questo repository usa `yarn`, ma gli script funzionano anche via `npm`.

```bash
yarn install
yarn dev
```

Apri `http://localhost:3000` nel browser.

Script disponibili:

```bash
yarn dev
yarn build
yarn start
yarn lint
```

## Aggiornare o aggiungere un'edizione

1. Aggiungi il nuovo file in `app/data/` seguendo il formato degli anni esistenti.
2. Importa il dataset in `app/lib/baccanale.ts`.
3. Registralo nella mappa `yearDataByYear`.
4. Aggiungi il tema dell'anno in `yearThemes`.

Una volta fatto, l'anno entra automaticamente nell'archivio, nelle pagine statiche e nella navigazione.

## Note sul progetto

- Il sito e dichiaratamente non ufficiale.
- I dati provengono da `baccanaleimola.it`.
- Le pagine anno e ristorante sono generate da dati locali presenti nel repository.
