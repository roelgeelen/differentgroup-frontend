export class Values {
  deal_id: number;
  dealname?: string;
  adviseur?: string;
  definitieve_bestelmaat: string;
  actieve_deur: string;
  draairichting: string;
  kleuropties: string;
  krukset_deurbeslag: string;
  model: string;
  paneel: string;
  breedte: number;
  hoogte: number;
  verdeling_symmetrisch: string;
  cilinder: string;
  glassectie: string;
  montage: string;
  bestaande_deur: string;
  type_deur: string;
  vloeraanpassing: string;
  aftimmering_binnenzijde: string;
  bouwkundig_aanpassingen: string;
  indicatie_van_montage_uren: string;
  overige_opmerkingen_klant: string;
  overige_opmerkingen_intern: string;
  materiaal_te_bestellen_door_werkvoorbereiding: string;
  profilering: string;
  uitstraling: string;
  deur_ral: string;
  kozijn_ral: string;
  scharnier_ral: string;
  netto_glasmaat: string;
  glassectie_in_vleugel: string;
  links: number;
  rechts: number;
  schets: any;
  foto_buitenzijde: { url: string; type: string; };
  foto_binnenzijde: { url: string; type: string; };

  public constructor(init?: Partial<Values>) {
    Object.assign(this, init);
  }
}
