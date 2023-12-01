import { rest } from 'msw'
import { API_URL } from '../app/constants'

export const handlers = [
  rest.get(API_URL, async (req, res, ctx) => {
    if (req.url.searchParams.get('character') === 'Nelson') {
      return await res(
        ctx.json([
          {
            quote:
                            'Shoplifting is a victimless crime, like punching someone in the dark.',
            character: 'Nelson Muntz',
            image:
                            'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FNelsonMuntz.png?1497567511185',
            characterDirection: 'Left'
          }
        ])
      )
    } else {
      return await res(
        ctx.json([
          {
            quote:
                            'Remember the time he ate my goldfish? And you lied and said I never had a goldfish. Then why did I have the bowl, Bart? Why did I have the bowl?',
            character: 'Milhouse Van Houten',
            image:
                            'https://cdn.glitch.com/3c3ffadc-3406-4440-bb95-d40ec8fcde72%2FMilhouseVanHouten.png?1497567513002',
            characterDirection: 'Right'
          }
        ])
      )
    }
  })
]
