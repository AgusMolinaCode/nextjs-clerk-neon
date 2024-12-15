import prisma from './prisma'

export async function getCompanies(
  limit?: number,
  sort: 'title' | 'createdAt' = 'createdAt',
  order: 'asc' | 'desc' = 'desc'
) {
  const companies = await prisma.company.findMany({
    orderBy: {
      [sort]: order
    },
    take: limit
  })

  return companies
}

export async function getCompanyBySlug(slug: string) {
  return await prisma.company.findUnique({
    where: {
      slug
    },
    include: {
      users: {
        orderBy: {
          createdAt: 'desc'
        }
      }
    }
  })
}
