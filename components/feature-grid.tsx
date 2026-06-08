"use client";

import { motion } from "framer-motion";
import { features } from "@/lib/data";
import { Card } from "@/components/ui/card";

export function FeatureGrid() {
  return (
    <section className="bg-[#07111f] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.24em] text-cyber-cyan">Platform modules</p>
          <h2 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">A complete safety intelligence stack.</h2>
          <p className="mt-4 text-white/70">Built as a premium SaaS product with user, analyst, responder, and administrator workflows.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.035 }}
            >
              <Card className="h-full p-5 transition duration-300 hover:-translate-y-1 hover:border-cyber-cyan/40 hover:shadow-glow">
                <div className="mb-5 grid h-12 w-12 place-items-center rounded-md bg-cyber-cyan/10 text-cyber-cyan">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                <p className="mt-3 text-sm leading-6 text-white/70">{feature.copy}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
