const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    // קטגוריה ותת-קטגוריה שכבר נוצרו
    const categoryShoose = await prisma.category.create({
        data: { name: "Shoes" }
    });

    const subCategorySportsShoose = await prisma.subCategory.create({
        data: {
            name: "Sports Shoes",
            category: { connect: { id: categoryShoose.id } },
        }
    });

    // יצירת עובד
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

    // הוספת מוצרים של נעלי ספורט
    const productsData = [
        {
            name: "Nike Air Max",
            description: "Comfortable sports shoes",
            price: 150.00,
            amount: 20,
            sales: 5,
            image: "https://example.com/nike-air-max.jpg",
        },
        {
            name: "Adidas Ultraboost",
            description: "Running shoes with advanced cushioning",
            price: 180.00,
            amount: 15,
            sales: 3,
            image: "https://example.com/adidas-ultraboost.jpg",
        },
        {
            name: "Puma Running Shoes",
            description: "Lightweight and durable running shoes",
            price: 130.00,
            amount: 25,
            sales: 7,
            image: "https://example.com/puma-running.jpg",
        }
    ];

    // יצירת המוצרים וקישור לקטגוריה, תת-קטגוריה ועובד
    for (const productData of productsData) {
        const product = await prisma.product.create({
            data: {
                ...productData,
                category: {
                    connect: {
                        id: categoryShoose.id,
                    },
                },
                subCategory: {
                    connect: {
                        id: subCategorySportsShoose.id,
                    },
                },
                employee: {
                    connect: {
                        id: employee.id,
                    }
                }
            },
        });
        console.log("מוצר נוצר:", product);
    }
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    });
