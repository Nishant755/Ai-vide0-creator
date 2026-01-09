import { NextRequest, NextResponse } from "next/server";
import { currentUser } from "@clerk/nextjs/server";
import { usersTable } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    try {
        const user = await currentUser()
        console.log(user)

        // Check if user exists
        const users = await db.select().from(usersTable).where(eq(usersTable.email, user?.primaryEmailAddress?.emailAddress as string));

        // If user does not exist, create a new one
        if (users?.length === 0) {
            const newUser = await db.insert(usersTable).values({
                name: user?.fullName as string,
                email: user?.primaryEmailAddress?.emailAddress as string,
            }).returning();

            return NextResponse.json(newUser[0])
        }

        return NextResponse.json(users[0])

    } catch (error) {
        console.error("Error in /api/user:", error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error }), { status: 500 })
    }
}