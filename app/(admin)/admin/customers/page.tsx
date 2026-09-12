"use client";

import React, { useState } from "react";
import { Users, Search, Mail, Phone, ShoppingBag, DollarSign, Calendar, CheckCircle2 } from "lucide-react";
import { MOCK_CUSTOMERS } from "@/components/admin/admin-data";
import { Customer } from "@/components/admin/types";

export default function AdminCustomersPage() {
  const [customers] = useState<Customer[]>(MOCK_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm)
  );

  const totalSpentAll = customers.reduce((acc, c) => acc + c.totalSpent, 0);
  const avgSpent = (totalSpentAll / (customers.length || 1)).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Customer Directory
        </h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          View registered shopper accounts, lifetime order values, and activity histories.
        </p>
      </div>

      {/* Customer Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 dark:bg-purple-950/50 dark:text-purple-400">
            <Users className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">Total Customers</span>
            <span className="text-lg font-bold text-foreground">{customers.length} Shoppers</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400">
            <CheckCircle2 className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">Active Shoppers</span>
            <span className="text-lg font-bold text-foreground">
              {customers.filter((c) => c.status === "Active").length} Active
            </span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-card border border-border flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400">
            <DollarSign className="size-5" />
          </div>
          <div>
            <span className="text-[11px] text-muted-foreground block">Avg Lifetime Spend</span>
            <span className="text-lg font-bold text-foreground">${avgSpent}</span>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs flex items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search customers by name, email, phone..."
            className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>
        <span className="text-xs text-muted-foreground hidden sm:block">
          {filteredCustomers.length} registered profiles
        </span>
      </div>

      {/* Customers Table */}
      <div className="bg-card rounded-2xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border/80 bg-muted/20 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Orders Placed</th>
                <th className="py-3.5 px-4">Total Spent</th>
                <th className="py-3.5 px-4">Member Since</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60 text-xs">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-muted/30 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={customer.avatar}
                        alt={customer.name}
                        className="size-9 rounded-full object-cover ring-1 ring-border"
                      />
                      <div>
                        <p className="font-semibold text-foreground">{customer.name}</p>
                        <span className="text-[10px] text-muted-foreground">{customer.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 text-foreground">
                        <Mail className="size-3 text-muted-foreground" />
                        <span>{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-muted-foreground text-[11px]">
                        <Phone className="size-3" />
                        <span>{customer.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="font-semibold text-foreground">
                      {customer.ordersCount} orders
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-bold text-foreground">
                    ${customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-3.5 px-4 text-muted-foreground whitespace-nowrap">
                    {customer.joinedDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                        customer.status === "Active"
                          ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
                          : "bg-muted text-muted-foreground border-border"
                      }`}
                    >
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
