import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const product = await prisma.product.create({
        data: req.body
      })
      res.status(200).json(product)
    } catch (error) {
      res.status(500).json({ error: 'Error al crear el producto' })
    }
  } else {
    res.setHeader('Allow', ['POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 