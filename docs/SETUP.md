# Kehitysympäristön Pystytys

Tämä ohje kertoo, miten saat pystytettyä projektiin liittyvän kehitysympäristön paikallisesti käyttäen valmista skriptiä.

## Esivaatimukset

- Varmista, että sinulla on `npm` ja `poetry` asennettuna koneellesi.
- Skriptin suorittaminen vaatii, että sinulla on oikeudet suorittaa skriptejä. Tarvittaessa voit antaa skriptille suoritusoikeudet komennolla `chmod +x /path/to/script`.

## Asennusohjeet

1. Navigoi projektin juurihakemistoon komentorivillä.
2. Suorita skripti komennolla `./scripts/setup-dev-environment.sh`.

Skripti hoitaa loput ja käynnistää tarvittavat palvelut ja asennukset.

## Mahdollisia Ongelmatilanteita

1. **Skripti ei käynnisty**:
   - Varmista, että sinulla on oikeudet suorittaa skriptiä. Voit antaa skriptille suoritusoikeudet komennolla `chmod +x /path/to/script`.
2. **Riippuvuuksien asennus epäonnistuu**:
   - Varmista, että verkkoyhteys toimii ja yritä uudelleen.
   - Varmista, että sinulla on tarvittavat työkalut (`npm` ja `poetry`) asennettuna.

Lisää ongelmatilanteita ja ratkaisuja voi lisätä tähän osioon tarpeen mukaan.
