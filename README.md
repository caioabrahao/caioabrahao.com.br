# Personal Website made with Astro
Just a lil personal site for myself. Im focusing mainly on photography stuff it it, but i may add more other cool stuff in the future if people actually start to access it...

## Noticeable Information:
- Made with Astro + Tailwind CSS
- Hosted on Cloudflare Pages
- Photos stored in Cloudflare R2
- Dashboard have secured access by Cloudflare Zero Trust

## Git Convention:
This is a personal project, so im very laid back with git, but i ended up using these just to keep things organized:
- `feat`: I did something major
- `docs`: I just updated the README or some other doc
- `fix`: I fixed something that wasn't working
- `checkpoint`: I wanted to resume work from my laptop to my pc, so i pushed everything to main, no fucks given
- `setup`: I laid the foundation for a new feature, like adding a new dependency

## Keeping track of the architecture...
- 2 mains pillars/zones of the site: Public Showcase and Management Dashboard

### APIs
- `images.ts` api fetches all bucket items from the R2 bucket and returns a list of it.
  - ( ! ) It cashes the list for 5mins. When an image is uploaded it forces a cash refresh.

#### Images API query parameters
| Route   |      Available Parameter      |  Details |
|----------|:-------------:|------:|
| `/api/images?maxKeys=` |  maxKeys | optional, defaults to 100 |
| `/api/images?prefix=` |    prefix   |   optional |
| `/api/images?order=` | order |    available options: `asc`, `desc`. Defaults to `desc` |

Examples:

- `/api/images` - Return all images in the bucket root directory
- `/api/images?maxKeys=5` - Return only 5 images
- `/api/images?prefix=highlights/` - Return all images in the "highlights" folder

### Tailwind Custom Utilities
Access the `global.css` at `src/styles/global.css` to view all the global utilities. You can also access it [Here](./src/styles/global.css).

Noticeable utilities are:
- Button styles: `btn-primary`, `btn-secondary` and `btn-soft`.
- Pages: `global-padding-x`: Applies horizontal padding to a page, serving as side margins.
- Styled Scrollbar: `scrollbar`. Styles the scrollbar of the container to match the site visual style.
- Card styles: `card-style` and `card-style-darker`. Applies only the styling to a Card component.

Theres also theme variables to keep the visuals consistent (located at the `@theme` bracket on top of the global css.). Those include:
- Colors like: `bg`, `surface`, `accent`, `border-soft`, `warning`, you get the idea.
- Fonts:
  - `gunter`: Used for main titles,
  - `warbler-display`: Used for secondary titles
  - `cesso`: Idk why its there, might delete later.
  - Not a variable, but the whole site uses the font `proxima-nova` as the default.
  
> ( i ) Note: Fonts are fetched from Adobe Fonts. As im writing this, theres no fallback fonts for non-paid service. 