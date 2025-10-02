# Final Exam: Fin-Customer App

## Overview
This is a Next.js + MongoDB CRUD application with three modules:
- Category
- Product
- Customer

Each module supports full Create, Read, Update, Delete (CRUD).

## Features
- RESTful API routes under `/fin-customer/api`
- Frontend pages with forms + DataGrid for management
- MongoDB Atlas as database
- PM2 + Nginx for deployment on Azure VM

## Live Demo
- Home: http://20.2.209.34/fin-customer
- Categories: http://20.2.209.34/fin-customer/category
- Products: http://20.2.209.34/fin-customer/product
- Customers: http://20.2.209.34/fin-customer/customer

## Deployment
- Node.js v22 + PNPM
- Build with `pnpm build`
- Run with PM2 using `ecosystem.config.js`
- Reverse proxy via Nginx
