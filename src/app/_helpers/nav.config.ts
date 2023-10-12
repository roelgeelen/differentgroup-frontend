import {Page} from "../_models/pages/Page";
import {EnumRoles} from "../_models/enum/enumRoles";

export const navConfig: Page[] = [
  {
    url: '/verkoop',
    title: 'Verkoop',
    icon: 'dashboard',
    pages: [
      {
        url: '/verkoop/afspraken',
        title: 'Afspraken',
        icon: 'map',
        roles: [
          EnumRoles.AFSPRAKEN,
        ]
      },
      {
        url: '/verkoop/inmeten',
        title: 'Inmeten',
        icon: 'table_chart',
        roles: [
          EnumRoles.INMETEN,
        ]
      },
      {
        url: '/verkoop/formulier',
        title: 'Formulieren',
        icon: 'dashboard',
        roles: [
          EnumRoles.FORMULIEREN,
          EnumRoles.FORMULIEREN_KLANT,
        ]
      }
    ],
    roles: [
      EnumRoles.AFSPRAKEN,
      EnumRoles.INMETEN,
      EnumRoles.FORMULIEREN
    ]
  },
  {
    url: '/planning',
    title: 'Planning',
    icon: 'insert_chart_outlined',
    pages: [
      {
        url: '/planning/tracking',
        title: 'Tracking',
        icon: 'maps',
        roles: [
          EnumRoles.TRACKING,
          EnumRoles.AFSPRAKEN,
        ]
      },
      {
        url: '/planning/productie',
        title: 'Productie',
        icon: 'bar_chart',
        roles: [
          EnumRoles.PRODUCTIE,
        ]
      },
      {
        url: '/planning/geproduceerd',
        title: 'Geproduceerd',
        icon: 'bar_chart',
        roles: [
          EnumRoles.GEPRODUCEERD,
        ]
      },
    ],
    roles: [
      EnumRoles.TRACKING,
      EnumRoles.AFSPRAKEN,
      EnumRoles.PRODUCTIE,
      EnumRoles.GEPRODUCEERD,
    ]
  },
  {
    url: '/magazijn',
    title: 'Magazijn',
    icon: 'supervised_user_circle',
    pages: [
      {
        url: '/magazijn/logistiek',
        title: 'Logistiek',
        icon: 'calendar_today',
        roles: [
          EnumRoles.LOGISTIEK,
        ]
      },
      {
        url: '/magazijn/controle',
        title: 'Controle',
        icon: 'playlist_add_check',
        roles: [
          EnumRoles.CONTROLE,
        ]
      },
      {
        url: '/magazijn/voorraad',
        title: 'Voorraad',
        icon: 'bar_chart',
        roles: [
          EnumRoles.VOORRAAD,
        ]
      },
      {
        url: '/magazijn/bestellingen',
        title: 'Bestellingen',
        icon: 'storage',
        roles: [
          EnumRoles.BESTELLINGEN_BEHEREN,
        ]
      }
    ],
    roles: [
      EnumRoles.LOGISTIEK,
      EnumRoles.CONTROLE,
      EnumRoles.VOORRAAD,
      EnumRoles.BESTELLINGEN_BEHEREN
    ],
  },
  {
    url: '/rapportage',
    title: 'Rapportage',
    icon: 'attach_money',
    pages: [
      {
        url: '/rapportage/dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        roles: [
          EnumRoles.RAPPORTAGE
        ]
      },
      {
        url: '/rapportage/financieel',
        title: 'Financieel',
        icon: 'attach_money',
        roles: [
          EnumRoles.FINANCIEEL
        ]
      }
    ],
    roles: [
      EnumRoles.RAPPORTAGE,
      EnumRoles.FINANCIEEL
    ],
  },
  {
    url: '/hrm',
    title: 'HRM',
    icon: 'supervised_user_circle',
    pages: [
      {
        url: '/hrm/werknemers',
        title: 'Werknemers',
        icon: 'group',
        roles: [
          EnumRoles.BERICHTEN_BEHEREN
        ]
      },
    ],
    roles: [
      EnumRoles.BERICHTEN_BEHEREN,
      EnumRoles.ROLLEN_BEHEREN
    ],
  },
  {
    url: '/admin',
    title: 'Beheer',
    icon: 'supervised_user_circle',
    pages: [
      {
        url: '/admin/nieuws',
        title: 'Berichten',
        icon: 'message',
        roles: [
          EnumRoles.BERICHTEN_BEHEREN
        ]
      },
      // {
      //   url: '/admin/nieuws/create',
      //   title: 'Nieuw bericht',
      //   icon: 'add',
      //   roles: [
      //     EnumRoles.BERICHTEN_BEHEREN
      //   ]
      // },
      {
        url: '/admin/roles',
        title: 'Rollen',
        icon: 'supervisor_account',
        roles: [
          EnumRoles.ROLLEN_BEHEREN,
        ]
      }
    ],
    roles: [
      EnumRoles.BERICHTEN_BEHEREN,
      EnumRoles.ROLLEN_BEHEREN
    ],
  }
]
