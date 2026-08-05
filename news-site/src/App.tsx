import { Masthead } from '@/components/Masthead'
import { Ticker } from '@/components/Ticker'
import { Section } from '@/components/Section'
import { CateringSection } from '@/components/CateringSection'
import { Footer } from '@/components/Footer'
import { brasil, mundo } from '@/data/news'

function App() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--ink)', minHeight: '100vh' }}>
      <Masthead />
      <Ticker />

      <Section
        id="brasil"
        kicker="Economia & Bolsa"
        title="Brasil"
        intro="Juros, inflação, resultados corporativos e commodities que movem o mercado doméstico."
        stories={brasil}
      />

      <Section
        id="mundo"
        kicker="Mercados Globais"
        title="Mundo"
        intro="Bolsas, bancos centrais e os grandes movimentos corporativos ao redor do globo."
        stories={mundo}
      />

      <div className="h-px" style={{ background: 'var(--rule)' }} />

      <CateringSection />

      <Footer />
    </div>
  )
}

export default App
