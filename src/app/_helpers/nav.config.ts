import {Page} from "../_models/pages/Page";
import {EnumRoles} from "../_models/enum/enumRoles";

export const navConfig: Page[] = [
  {
    url: '/verkoop',
    title: 'Verkoop',
    icon: 'dashboard',
    pages: [
      {
        url:'/verkoop/afspraken',
        title: 'Afspraken',
        icon: 'map',
        roles: [
          EnumRoles.OFFICE
        ]
      },
      {
        url:'/verkoop/inmeten',
        title: 'Inmeten',
        icon: 'table_chart',
        roles: [
          EnumRoles.OFFICE
        ]
      },
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
        url:'/planning/logistiek',
        title: 'Logistiek',
        icon: 'calendar_today',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]},
      {
        url:'/planning/productie',
        title: 'Productie',
        icon: 'bar_chart',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PRODUCTION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]},
      {
        url:'/planning/magazijn',
        title: 'Magazijn',
        icon: 'bar_chart',
        roles: [
          EnumRoles.ENGINEERING,
          EnumRoles.ADMINISTRATION,
          EnumRoles.PLANNING,
          EnumRoles.ICT
        ]},
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
    url: '/bouw',
    title: 'Bouw',
    icon: 'linked_camera',
    roles: [
      EnumRoles.OFFICE
    ]
  }
]
