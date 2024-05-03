This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

# Vårat projekt

Detta projektet är en reseplanerare där användare kan lägga till resor innehållande Destination, Startpunkt, Datum för resan samt Aktiviteter man vill göra längs vägen. Dessa objekt sparas i IndexDb och det finns även funktionalitet för att lägga till resor som favoriter, då sparas de i local storage.

# Förbättringar och deras inverkan på användarupplevelsen

Vi har implementerat flera förbättringar för att förbättra prestanda och tillgänglighet i vår Next.js-applikation.
Vi har bland annat en ny dynamisk favorit knapp som är en stjärna. När man trycker på den läggs resan till som favorit och stjärnan blir ifylld i en vacker gul färg vilket indikerar till användaren att resan nu finns som favorit.

## Lazy Loading

Vi har implementerat lazy loading av komponenter med `next/dynamic`. Detta innebär att komponenter endast laddas när de behövs, vilket minskar den initiala laddningstiden och förbättrar prestanda, särskilt för användare med långsamma internetanslutningar.

## Semantisk HTML och Tillgänglighet

Vi har också uppdaterat vår HTML för att vara mer semantisk, vilket gör det lättare för skärmläsare och andra hjälpmedel att förstå innehållet på sidan. Vi har till exempel ersatt `<div>`-element med mer beskrivande element som `<article>`, `<main>`, och `<button>`. Detta förbättrar tillgängligheten och gör vår webbplats mer användbar för personer med funktionsnedsättningar.

# Teknisk genomgång

## Lazy Loading

För att implementera lazy loading av komponenter, har vi använt `next/dynamic`. Detta innebär att vi importerar komponenter dynamiskt med `import()` istället för `import`. Här är ett exempel:

```jsx
const DynamicComponent = dynamic(() => import("../components/DynamicComponent"));
```

## Tillgänglighetsanpassningar

För att förbättra tillgängligheten, har vi använt semantisk HTML och tillämpat ARIA-attribut där det är nödvändigt. Vi har också sett till att alla interaktiva element är fokuserbara och att deras roll korrekt meddelas av skärmläsare.

## Utmaningar

En av de största utmaningarna vi stött på var att säkerställa att alla våra komponenter var tillgängliga och fokuserbara. Detta krävde en noggrann genomgång av vår kod och en förståelse för hur olika hjälpmedel interagerar med webbplatsen. Vi löste detta genom att läsa tillgänglighetsdokumentation och genom att testa vår webbplats med olika hjälpmedel.

En annan utmaning var att implementera lazy loading på ett sätt som inte stör användarupplevelsen. Vi löste detta genom att noggrant välja vilka komponenter som skulle lazy laddas.
