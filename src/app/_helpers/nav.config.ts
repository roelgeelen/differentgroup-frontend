import {Page} from "../_models/pages/Page";
import {EnumRoles} from "../_models/enum/enumRoles";

export const pageConfig: Page[] = [
  {url: '/', title: 'Dashboard', icon: 'dashboard', roles: []},
  {
    url: '/graph',
    title: 'Grafieken',
    icon: 'insert_chart_outlined',
    pages: [
      {url: '/graph/production', title: 'Productie', icon: 'bar_chart'},
      {url: '/graph/inmeten', title: 'Inmeten', icon: 'table_chart'},
      {url: '/graph/magazijn', title: 'Magazijn', icon: 'bar_chart'}
    ],
    roles: [
      EnumRoles.OFFICE
    ]
  },
  {
    url: '/nearby',
    title: 'Afspraken dichtbij',
    icon: 'map',
    roles: [
      EnumRoles.OFFICE
    ]
  },
  {
    url: '/logistiek',
    title: 'Planning logistiek',
    icon: 'calendar_today',
    roles: [
      EnumRoles.OFFICE
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
