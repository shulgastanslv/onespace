import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const vault = await prisma.vault.findUnique({
      where: { id: params.id },
    });

    if (!vault) {
      return new NextResponse('Vault not found', { status: 404 });
    }

    return NextResponse.json(vault);
  } catch {
    return new NextResponse('Internal Error', { status: 500 });
  }
}
