const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // יצירת קטגוריה
    const category = await prisma.category.create({
        data: {
            name: "Electronics",
        }
    })

    // יצירת תת-קטגוריה וקישור לקטגוריה
    const subCategory = await prisma.subCategory.create({
        data: {
            name: "Phones",
            category: { connect: { id: category.id } },
        }
    })

    const employee = await prisma.employees.create({
        data: {
            user: {
                create: {
                    email: "employee1@example.com",
                    name: "John Doe",
                    password: {
                        create: {
                            hash: "hashed_password"
                        }
                    }
                }
            },
            business: {
                create: {
                    name: "Tech Business",
                    logo: "logo.png",
                    phone: "123-456-7890",
                    email: "business@example.com",
                    address: "123 Tech St",
                    zipCode: "12345"
                }
            }
        }
    });

    console.log("עובד נוצר:", employee);

    // יצירת מוצר וקישור לקטגוריה ותת-קטגוריה
    const product = await prisma.product.create({
        data: {
            name: "iPhone 13",
            description: "Latest Apple iPhone with A15 Bionic chip",
            price: 999.99,
            amount: 10,
            sales: 0,
            image: "https://example.com/iphone13.jpg",
            category: {
                connect: {
                    id: category.id,
                },
            },
            subCategory: {
                connect: {
                    id: subCategory.id,
                },
            },
            employee: {
                connect: {
                    id: employee.id // קשר לעובד שנוצר
                }
            }
        },
    });


    console.log({ product })
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
