import { PrismaClient, Users } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // יצירת קטגוריה ותת-קטגוריה
  const categoryShoose = await prisma.category.create({
    data: { name: "Shoes" },
  });

  const subCategorySportsShoose = await prisma.subCategory.create({
    data: {
      name: "Sports Shoes",
      category: { connect: { id: categoryShoose.id } },
    },
  });

  // יצירת עובד ובית עסק
  const employee = await prisma.employees.create({
    data: {
      user: {
        create: {
          email: "employee1@example.com",
          name: "John Doe",
          password: { create: { hash: "hashed_password" } },
        },
      },
      business: {
        create: {
          name: "Tech Business",
          logo: "logo.png",
          phone: "123-456-7890",
          email: "business@example.com",
          address: "123 Tech St",
          zipCode: "12345",
        },
      },
    },
  });

  console.log("עובד נוצר:", employee);

  // יצירת מוצרים
  const productCreation = await prisma.product.createMany({
    data: [
      {
        name: "Nike Air Max",
        description: "Comfortable sports shoes",
        price: 150.0,
        amount: 20,
        sales: 5,
        image: "https://example.com/nike-air-max.jpg",
        categoryId: categoryShoose.id,
        subCategoryId: subCategorySportsShoose.id,
        employeeId: employee.id,
      },
      {
        name: "Adidas Ultraboost",
        description: "Running shoes with advanced cushioning",
        price: 180.0,
        amount: 15,
        sales: 3,
        image: "https://example.com/adidas-ultraboost.jpg",
        categoryId: categoryShoose.id,
        subCategoryId: subCategorySportsShoose.id,
        employeeId: employee.id,
      },
    ],
  });

  console.log(`נוצרו ${productCreation.count} מוצרים.`);

  // יצירת כתובות
  const addressCreation = await prisma.address.createMany({
    data: [
      {
        country: "Israel",
        city: "Tel Aviv",
        street: "Herzl St",
        houseNumber: "12A",
        zipCode: "67890",
      },
      {
        country: "Israel",
        city: "Jerusalem",
        street: "King George St",
        houseNumber: "7",
        zipCode: "91000",
      },
    ],
  });

  console.log(`נוצרו ${addressCreation.count} כתובות.`);

  // מציאת כתובות ויצירת משתמשים
  const [address1, address2] = await prisma.address.findMany();

  const users: Users[] = await Promise.all([
    prisma.users.create({
      data: {
        email: "user1@example.com",
        name: "Alice Smith",
        addressId: address1.id,
        password: { create: { hash: "user1_password_hash" } },
      },
    }),
    prisma.users.create({
      data: {
        email: "user2@example.com",
        name: "Bob Johnson",
        addressId: address2.id,
        password: { create: { hash: "user2_password_hash" } },
      },
    }),
  ]);

  console.log("משתמשים נוצרו:", users);

  // יצירת שיטת תשלום
  const paymentMethod = await prisma.paymentMethod.create({
    data: { name: "Credit Card" },
  });

  console.log("שיטת תשלום נוצרה:", paymentMethod);

  // יצירת סטטוסי הזמנות
  const orderStatuses = await prisma.ordersStatus.createMany({
    data: [
      { id: "1", name: "Order Received" },   // ההזמנה התקבלה
      { id: "2", name: "Order Cancelled" },  // ההזמנה בוטלה
      { id: "3", name: "Order Shipped" },    // ההזמנה נשלחה
      { id: "4", name: "Out for Delivery" }, // ההזמנה בדרך
      { id: "5", name: "Delivered to Customer" } // ההזמנה נמסרה ללקוח
    ],
  });
  // const [orderStatusProcessing, orderStatusShipped] = await Promise.all([
  //   prisma.ordersStatus.create({ data: { name: "Processing" } }),
  //   prisma.ordersStatus.create({ data: { name: "Shipped" } }),
  // ]);

   console.log("סטטוסי הזמנות נוצרו");

  // יצירת הזמנות
  const orders = await Promise.all([
    prisma.orders.create({
      data: {
        orderDate: new Date(),
        totalAmount: 330.0,
        paymentMethodId: paymentMethod.id,
        shippingAddressId: address1.id,
        expectedDeliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        userId: users[0].id,
        statusId: orderStatuses[0].id,
        orderItems: {
          create: [
            {
              productId: (await prisma.product.findFirst({ where: { name: "Nike Air Max" } }))?.id!,
              quantity: 2,
              price: 150.0,
            },
            {
              productId: (await prisma.product.findFirst({ where: { name: "Adidas Ultraboost" } }))?.id!,
              quantity: 1,
              price: 180.0,
            },
          ],
        },
      },
    }),
    prisma.orders.create({
      data: {
        orderDate: new Date(),
        totalAmount: 150.0,
        paymentMethodId: paymentMethod.id,
        shippingAddressId: address2.id,
        expectedDeliveryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
        userId: users[1].id,
        statusId: orderStatusShipped.id,
        orderItems: {
          create: [
            {
              productId: (await prisma.product.findFirst({ where: { name: "Nike Air Max" } }))?.id!,
              quantity: 1,
              price: 150.0,
            },
          ],
        },
      },
    }),
  ]);

  console.log("הזמנות נוצרו:", orders);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
