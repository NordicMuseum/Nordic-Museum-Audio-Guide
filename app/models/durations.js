
export class Durations {
  static NAME = 'Durations'

  static schema = {
    name: Durations.NAME,
    properties: {
      en: { type: 'int', optional: true },
      sv: { type: 'int', optional: true },
      it: { type: 'int', optional: true },
      ar: { type: 'int', optional: true },
      es: { type: 'int', optional: true },
      fi: { type: 'int', optional: true },
      de: { type: 'int', optional: true },
      ru: { type: 'int', optional: true },
      fr: { type: 'int', optional: true },
      zh: { type: 'int', optional: true },
      svSimple: { type: 'int', optional: true },
      svKids: { type: 'int', optional: true },
      seSme: { type: 'int', optional: true },
      seSmj: { type: 'int', optional: true },
      seSma: { type: 'int', optional: true },
    },
  }
}
