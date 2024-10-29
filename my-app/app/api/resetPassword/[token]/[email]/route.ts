import { NextResponse } from "next/server";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export async function POST(req: Request, { params }: { params: { token: string, email: string } }) {
    const { token, email } = params;
    const { newPassword } = await req.json(); // קבלת הסיסמה החדשה מהגוף של הבקשה

    if (!newPassword || !token) {
        return NextResponse.json({ message: "Invalid request" }, { status: 400 });
    }

    // חיפוש המשתמש עם הטוקן המתאים
    const user = await prisma.users.findFirst({
        where: {
            passwordResetToken: token,
            passwordResetTokenExpiry: { gt: new Date() }, // בדיקת אם הטוקן בתוקף
        },
    });

    // בדיקת אם המשתמש נמצא
    if (!user) {
        return NextResponse.json({ message: "Invalid or expired token" }, { status: 400 });
    }

    // קידוד הסיסמה החדשה
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // עדכון הסיסמה במאגר הנתונים
    await prisma.users.update({
        where: { email },
        data: {
            password: { update: { hash: hashedPassword } },
            passwordResetToken: null, // הסרת הטוקן
            passwordResetTokenExpiry: null, // הסרת תאריך תפוגה
        },
    });

    return NextResponse.json({ message: "Password reset successfully", success: true });
}
