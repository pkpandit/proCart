"use client";

import React, { useState } from "react";
import { useCart } from "@/components/cart/CartContext";
import { Dialog } from "@/components/ui/Dialog";

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen } = useCart();
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${isSignIn ? "Signed In" : "Registered"} successfully with ${email}`);
    setAuthModalOpen(false);
    // Clear inputs
    setEmail("");
    setPassword("");
    setName("");
  };

  return (
    <Dialog
      open={authModalOpen}
      onClose={() => setAuthModalOpen(false)}
      title={isSignIn ? "Sign In to FreshCart" : "Create your Account"}
      maxWidth="max-w-md"
    >
      <form onSubmit={handleSubmit} className="py-2 space-y-4">
        {!isSignIn && (
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-border bg-card rounded-lg text-sm text-foreground focus:outline-hidden focus:border-primary/80 focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
            />
          </div>
        )}

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Email Address
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@mail.com"
            className="w-full px-3 py-2 border border-border bg-card rounded-lg text-sm text-foreground focus:outline-hidden focus:border-primary/80 focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            Password
          </label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full px-3 py-2 border border-border bg-card rounded-lg text-sm text-foreground focus:outline-hidden focus:border-primary/80 focus:ring-3 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/60"
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 bg-primary text-primary-foreground hover:bg-primary/95 font-semibold text-sm rounded-lg shadow-sm hover:shadow-md transition-all cursor-pointer text-center"
        >
          {isSignIn ? "Sign In" : "Sign Up"}
        </button>

        <div className="pt-2 text-center text-xs text-muted-foreground">
          {isSignIn ? "New to FreshCart?" : "Already have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignIn(!isSignIn)}
            className="text-primary font-bold hover:underline cursor-pointer bg-transparent border-0"
          >
            {isSignIn ? "Create an account" : "Sign in here"}
          </button>
        </div>
      </form>
    </Dialog>
  );
}
