import {Page} from "../_models/pages/Page";
import {EnumRoles} from "../_models/enum/enumRoles";

export const navConfig: Page[] = [
  {
    url: '/verkoop',
    title: 'Verkoop',
    icon: 'dashboard',
    pages: [
      {
        url: '/verkoop',
        title: 'Dashboard',
        icon: 'dashboard',
        roles: [
          EnumRoles.OFFICE,
          EnumRoles.ICT,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
        ]
      },
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
        url: '/planning/geproduceerd',
        title: 'Geproduceerd',
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
    url: '/magazijn',
    title: 'Magazijn',
    icon: 'supervised_user_circle',
    roles: [
      EnumRoles.STOCKROOM,
      EnumRoles.ENGINEERING,
      EnumRoles.ADMINISTRATION,
      EnumRoles.PLANNING,
      EnumRoles.ICT
    ],
    pages: [
      {
        url: '/magazijn/logistiek',
        title: 'Logistiek',
        icon: 'calendar_today',
        roles: [
          EnumRoles.STOCKROOM,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      },
      {
        url: '/magazijn/controle',
        title: 'Controle',
        icon: 'playlist_add_check',
        roles: [
          EnumRoles.STOCKROOM,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      },
      {
        url: '/magazijn/voorraad',
        title: 'Voorraad',
        icon: 'bar_chart',
        roles: [
          EnumRoles.STOCKROOM,
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]
      }
    ]
  },
  {
    url: '/rapportage',
    title: 'Rapportage',
    icon: 'attach_money',
    roles: [
      EnumRoles.ADMINISTRATION,
      EnumRoles.ICT
    ],
    pages: [
      {
        url: '/rapportage/dashboard',
        title: 'Dashboard',
        icon: 'dashboard',
        roles: [
          EnumRoles.ADMINISTRATION,
          EnumRoles.ICT
        ]
      },
      {
        url: '/rapportage/stoplichten',
        title: 'Stoplichten',
        icon: 'traffic',
        roles: [
          EnumRoles.ADMINISTRATION,
          EnumRoles.ICT
        ]
      },
      {
        url: '/rapportage/financieel',
        title: 'Financieel',
        icon: 'attach_money',
        roles: [
          EnumRoles.ADMINISTRATION,
          EnumRoles.ICT
        ]
      }
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
  }
]
