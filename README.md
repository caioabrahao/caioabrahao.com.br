# Personal Website made with Astro
Just a lil personal site for myself. Im focusing mainly on photography stuff it it, but i may add more other cool stuff in the future if people actually start to access it...

## Noticeable Information:
- Made with Astro + Tailwind CSS
- Hosted on Cloudflare Pages
- Photos stored in Cloudflare R2
- Dashboard have secured access by Cloudflare Zero Trust

## Keeping track of the architecture...
- 2 mains pillars/zones of the site: Public Showcase and Management Dashboard

### APIs
- `images.ts` api fetches all bucket items from the R2 bucket and returns a list of it.
- (!) It cashes the list for 5mins. When an image is uploaded it forces a cash refresh.

#### Images API query parameters
| Route   |      Available Parameter      |  Detail |
|----------|:-------------:|------:|
| `/api/images` |  maxKeys | optional, defaults to 100 |
| `/api/images` |    prefix   |   optional |
| `/api/images` | order |    not implemented **yet** |

Examples:

- `/api/images` - Return all images in the bucket root directory
- `/api/images?maxKeys=5` - Return only 5 images