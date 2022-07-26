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
  buiten: { url: string; type: string; };
  binnen: { url: string; type: string; };
  deur_reeds_ingemeten: string;
  maat_tussen_metselwerk: string;
  maat_tussen_latei: string;
  type_profilering: string;
  afstand_belijning: string;
  aflakken_op_locatie: string;
  uitstraling_binnenzijde: string;
  deur_ral_binnen: string;
  kozijn_ral_binnen: string;
  isolatie: string;
  omklapvoetjes: string;
  aantal_roedes: string;
  glasverdeling: string;

  public constructor(init?: Partial<Values>) {
    Object.assign(this, init);
  }
}
