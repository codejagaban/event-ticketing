import { NextResponse } from 'next/server';
import { createUser, registerUser } from '@directus/sdk';
import directus from "@/lib/directus";
import { User } from '@/types';


export async function POST(request: Request) {
  try {
    const { first_name, last_name, email, password, organization_name, organization_phone } = await request.json();
    const result = await directus.request(
      createUser({
        email,
        password,
        first_name,
        last_name,
        organization_name,
        organization_phone,
        role: process.env.NEXT_USER_ROLE,
      })
    );
    return NextResponse.json({ message: "Account Created!" }, { status: 201 });
  } catch (e: any) {
    console.log(e);
    const code = e.errors[0].extensions.code
    console.log(code);
    if (code === 'RECORD_NOT_UNIQUE') {
      return NextResponse.json({ message: "This user already exist" }, { status: 409 });
    }
    return NextResponse.json({ message: "An unexpected error occurred, please try again" }, { status: 500 });
  }

}