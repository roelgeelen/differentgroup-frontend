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
          EnumRoles.OFFICE,
          EnumRoles.ICT,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
        ]
      },
      {
        url: '/verkoop/inmeten',
        title: 'Inmeten',
        icon: 'table_chart',
        roles: [
          EnumRoles.OFFICE,
          EnumRoles.ICT,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
        ]
      },
      {
        url: '/verkoop/formulier',
        title: 'Formulieren',
        icon: 'dashboard',
        roles: [
          EnumRoles.OFFICE,
          EnumRoles.ICT,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
        ]
      }
    ],
    roles: [
      EnumRoles.OFFICE,
      EnumRoles.ICT,
      EnumRoles.ENGINEERING,
      EnumRoles.ADMINISTRATION,
    ]
  },
  {
    url: '/planning',
    title: 'Planning',
    icon: 'insert_chart_outlined',
    pages: [
      {
        url: '/planning/logistiek',
        title: 'Logistiek',
        icon: 'calendar_today',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      },
      {
        url: '/planning/productie',
        title: 'Productie',
        icon: 'bar_chart',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PRODUCTION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      },
      {
        url: '/planning/magazijn',
        title: 'Magazijn',
        icon: 'bar_chart',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      },
    ],
    roles: [
      EnumRoles.ENGINEERING,
      EnumRoles.ADMINISTRATION,
      EnumRoles.PRODUCTION,
      EnumRoles.PLANNING,
      EnumRoles.ICT
    ]
  },
  {
    url: '/administratie',
    title: 'Administratie',
    icon: 'dashboard',
    roles: [
      EnumRoles.ADMINISTRATION,
      EnumRoles.ICT
    ]
  },
  {
    url: '/admin',
    title: 'Beheer',
    icon: 'supervised_user_circle',
    roles: [
      EnumRoles.ADMIN,
      EnumRoles.ICT
    ],
    pages: [
      {
        url: '/admin/nieuws',
        title: 'Berichten',
        icon: 'message',
        roles: [
          EnumRoles.ADMIN,
          EnumRoles.ICT
        ]
      },
      {
        url: '/admin/nieuws/create',
        title: 'Nieuw bericht',
        icon: 'add',
        roles: [
          EnumRoles.ADMIN,
          EnumRoles.ICT
        ]
      }
    ]
  },
  {
    url: 'bestellen',
    title: 'Bestellen',
    icon: 'shopping_basket',
    pages: [
      {
        url: '/bestellen',
        title: 'Mijn bestellingen',
        icon: 'reorder',
        roles: []
      },
      {
        url: '/bestellen/bestel',
        title: 'Nieuwe bestelling',
        icon: 'add',
        roles: [

        ]
      },
    ],
    roles: []
  },
  {
    url: '',
    title: 'Bestellingen',
    icon: 'shopping_basket',
    roles: []
  }
]
