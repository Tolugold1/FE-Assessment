export type Trend = 'up' | 'down'

export type MetricCard = {
  id: string
  label: string
  value: string
  delta: string
  trend: Trend
  icon: string
}

export const cloudNetworkCards: MetricCard[] = [
  { id: 'users',       label: 'Users',       value: '3,836', delta: '15%', trend: 'down', icon: 'users' },
  { id: 'groups',      label: 'Groups',      value: '316',   delta: '23%', trend: 'up',   icon: 'groups' },
  { id: 'uploads',     label: 'Uploads',     value: '316',   delta: '23%', trend: 'up',   icon: 'upload' },
  { id: 'departments', label: 'Departments', value: '316',   delta: '23%', trend: 'down', icon: 'building' },
]

export const deviceCards: MetricCard[] = [
  { id: 'devices',      label: 'Number Of Devices', value: '3,836', delta: '15%', trend: 'up',   icon: 'devices' },
  { id: 'device-users', label: 'Users',             value: '3,836', delta: '15%', trend: 'down', icon: 'users' },
  { id: 'emails',       label: 'Emails',            value: '316',   delta: '23%', trend: 'down', icon: 'mail' },
  { id: 'apps',         label: 'Number of Apps',    value: '316',   delta: '23%', trend: 'down', icon: 'apps' },
]

export const productivityCards: MetricCard[] = [
  { id: 'hours',     label: 'Hours Productivity', value: '576 Hrs', delta: '15%', trend: 'down', icon: 'clock' },
  { id: 'days',      label: 'Days Activity',      value: '267 Days', delta: '15%', trend: 'up',  icon: 'calendar' },
  { id: 'prod-users', label: 'Users',             value: '3,836', delta: '15%', trend: 'down', icon: 'users' },
  { id: 'web',       label: 'Web Activity',       value: '178 Activities', delta: '15%', trend: 'up', icon: 'globe' },
]

export const fileSharingData = [
  { month: 'JAN', public: 50, anyoneWithLink: 30, withinOrg: 20 },
  { month: 'FEB', public: 60, anyoneWithLink: 35, withinOrg: 25 },
  { month: 'MAR', public: 40, anyoneWithLink: 28, withinOrg: 18 },
  { month: 'APR', public: 55, anyoneWithLink: 38, withinOrg: 30 },
  { month: 'MAY', public: 70, anyoneWithLink: 45, withinOrg: 35 },
  { month: 'JUN', public: 80, anyoneWithLink: 50, withinOrg: 40 },
  { month: 'JUL', public: 45, anyoneWithLink: 30, withinOrg: 22 },
  { month: 'AUG', public: 55, anyoneWithLink: 35, withinOrg: 28 },
  { month: 'SEP', public: 65, anyoneWithLink: 42, withinOrg: 30 },
  { month: 'OCT', public: 50, anyoneWithLink: 32, withinOrg: 22 },
  { month: 'NOV', public: 75, anyoneWithLink: 48, withinOrg: 36 },
  { month: 'DEC', public: 60, anyoneWithLink: 38, withinOrg: 26 },
]

export const totalEmailData = [
  { month: 'JAN', total: 1200 },
  { month: 'FEB', total: 1400 },
  { month: 'MAR', total: 1800 },
  { month: 'APR', total: 1700 },
  { month: 'MAY', total: 2100 },
  { month: 'JUN', total: 2600 },
  { month: 'JUL', total: 3700 },
  { month: 'AUG', total: 3300 },
  { month: 'SEP', total: 3800 },
  { month: 'OCT', total: 4200 },
  { month: 'NOV', total: 4000 },
  { month: 'DEC', total: 4400 },
]

export const emailBreakdown = {
  total: 5421,
  sent: 660,
  received: 932,
  unsent: 32,
}

export type ActiveCountry = { code: string; name: string; pct: number; flag: string }

export const activeCountries: ActiveCountry[] = [
  { code: 'GB', name: 'United Kingdom',         pct: 78, flag: 'gb' },
  { code: 'NG', name: 'Nigeria',                pct: 61, flag: 'ng' },
  { code: 'AE', name: 'UAE',                    pct: 45, flag: 'ae' },
  { code: 'CA', name: 'Canada',                 pct: 59, flag: 'ca' },
  { code: 'US', name: 'United States of America', pct: 78, flag: 'us' },
]

export type OnlineUser = {
  name: string
  location: string
  organization: string
  device: 'Windows' | 'Mac' | 'Linux'
  activity: { app: string; color: string }
  usage: string
  online: boolean
}

export const onlineUsers: OnlineUser[] = [
  { name: 'Annette Black',  location: 'Ottawa, Canada',     organization: 'MSBM, Ottawa',    device: 'Windows', activity: { app: 'Google Chrome',   color: 'chrome' },  usage: '3 hours 12 minutes', online: true  },
  { name: 'Floyd Miles',    location: 'Lagos, Nigeria',     organization: 'MSBM, Lagos',     device: 'Windows', activity: { app: 'Instagram',       color: 'instagram' }, usage: '2 hours 8 minutes',  online: true  },
  { name: 'Ronald Richards', location: 'Dubai, UAE',        organization: 'MSBM, Dubai',     device: 'Mac',     activity: { app: 'Microsoft Teams', color: 'teams' },     usage: '6 hours 45 minutes', online: false },
  { name: 'Guy Hawkins',    location: 'London, UK',         organization: 'MSBM, London',    device: 'Windows', activity: { app: 'Instagram',       color: 'instagram' }, usage: '1 hour 30 minutes',  online: false },
  { name: 'Jane Cooper',    location: 'Frankfurt, Germany', organization: 'MSBM, Frankfurt', device: 'Mac',     activity: { app: 'Google Chrome',   color: 'chrome' },    usage: '9 hours 10 minutes', online: false },
  { name: 'Leslie Alexander', location: 'Rome, Italy',      organization: 'MSBM, Rome',      device: 'Windows', activity: { app: 'YouTube',         color: 'youtube' },   usage: '45 minutes',         online: false },
  { name: 'Annette Black',  location: 'Calgary, Canada',    organization: 'MSBM, Calgary',   device: 'Linux',   activity: { app: 'Opera Mini',      color: 'opera' },     usage: '45 minutes',         online: false },
  { name: 'Floyd Miles',    location: 'Mumbai, India',      organization: 'MSBM, Mumbai',    device: 'Mac',     activity: { app: 'WhatsApp',        color: 'whatsapp' },  usage: '45 minutes',         online: true  },
  { name: 'Cody Fisher',    location: 'Lagos, Nigeria',     organization: 'MSBM, Lagos',     device: 'Windows', activity: { app: 'Microsoft Teams', color: 'teams' },     usage: '45 minutes',         online: false },
  { name: 'Dianne Russell', location: 'London, UK',         organization: 'MSBM, London',    device: 'Linux',   activity: { app: 'YouTube',         color: 'youtube' },   usage: '45 minutes',         online: true  },
]
