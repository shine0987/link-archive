export let sites = [
  {
    id: '1',
    category: 'WORK',
    name: 'GitHub',
    url: 'https://github.com',
    desc: 'Code Repository',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=600&q=80'
  }
];

export let isAdmin = false;

export function setSites(newSites) {
  sites = newSites;
}

export function setAdmin(value) {
  isAdmin = value;
}
