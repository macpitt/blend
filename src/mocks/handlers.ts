import { http, HttpResponse } from 'msw'
import { spices, spiceBlends } from './data'
import type { SpiceBlend } from '../types'

export const handlers = [
  // Get all spices
  http.get('/api/spices', () => {
    console.log('MSW: Returning all spices', spices.length)
    return HttpResponse.json(spices)
  }),

  // Get a specific spice by ID
  http.get('/api/spices/:id', ({ params }) => {
    const { id } = params
    const spice = spices.find(spice => spice.id === Number(id))
    
    if (!spice) {
      console.log(`MSW: Spice with id ${id} not found`)
      return new HttpResponse(null, { status: 404 })
    }
    
    console.log(`MSW: Returning spice with id ${id}`, spice)
    return HttpResponse.json(spice)
  }),

  // Get all blends
  http.get('/api/blends', () => {
    console.log('MSW: Returning all blends', spiceBlends.length)
    return HttpResponse.json(spiceBlends)
  }),

  // Get a specific blend by ID
  http.get('/api/blends/:id', ({ params }) => {
    const { id } = params
    const blend = spiceBlends.find(blend => blend.id === Number(id))
    
    if (!blend) {
      console.log(`MSW: Blend with id ${id} not found`)
      return new HttpResponse(null, { status: 404 })
    }
    
    console.log(`MSW: Returning blend with id ${id}`, blend)
    return HttpResponse.json(blend)
  }),

  // Create a new blend (with header safety and improved logging)
  http.post('/api/blends', async ({ request }) => {
    try {
      const headers = request.headers?.entries ?
      Object.fromEntries(request.headers.entries()) : {}
      console.log('MSW: Received headers', headers)

      const blendData = await request.json() as Omit<SpiceBlend, 'id'>
      
      const newBlend: SpiceBlend = {
        ...blendData,
        id: spiceBlends.length + 1 // Ensure unique ID
      }

      spiceBlends.push(newBlend)
      console.log('MSW: Created new blend', newBlend)
      
      return HttpResponse.json(newBlend, { status: 201 })
    } catch (error) {
      console.error('MSW: Error creating blend:', error)
      return new HttpResponse(
        JSON.stringify({ error: 'Failed to create blend' }), 
        { status: 400 }
      )
    }
  }),

  // Get all spices in a blend (including nested blends)
  http.get('/api/blends/:id/spices', ({ params }) => {
    const { id } = params
    const blendId = Number(id)
    
    const getAllSpicesInBlend = (blendId: number, processedBlends = new Set<number>()): number[] => {
      if (processedBlends.has(blendId)) return []
      processedBlends.add(blendId)

      const blend = spiceBlends.find(b => b.id === blendId)
      if (!blend) return []

      const spiceIds = [...blend.spices]

      for (const nestedBlendId of blend.blends) {
        const nestedSpiceIds = getAllSpicesInBlend(nestedBlendId, processedBlends)
        spiceIds.push(...nestedSpiceIds)
      }

      return spiceIds
    }

    const spiceIds = getAllSpicesInBlend(blendId)
    const uniqueSpiceIds = [...new Set(spiceIds)]

    const blendSpices = uniqueSpiceIds
      .map(spiceId => spices.find(spice => spice.id === spiceId))
      .filter(Boolean)

    console.log(`MSW: Returning ${blendSpices.length} spices for blend ${blendId}`)

    return HttpResponse.json(blendSpices)
  })
]
