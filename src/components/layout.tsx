import { Navbar, Button, Link } from "@nextui-org/react";
import { ThemeToggle } from "./ThemeToggle";
import { motion } from "framer-motion";

interface LayoutProps {
  children: React.ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

const navVariants = {
  initial: { y: -20, opacity: 0 },
  animate: { 
    y: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    }
  },
};

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        initial="initial"
        animate="animate"
        variants={navVariants}
      >
        <Navbar className="bg-background/60 backdrop-blur-md border-b border-divider">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Link href="/" className="text-xl font-bold text-primary">
                  AI Health Guard
                </Link>
              </motion.div>
              <div className="flex items-center gap-4">
                {[
                  { href: "/", label: "Symptoms" },
                  { href: "/pregnancy", label: "Pregnancy" },
                  { href: "/heart", label: "Heart" },
                  { href: "/diabetes", label: "Diabetes" },
                ].map((item, index) => (
                  <motion.div
                    key={item.href}
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                  >
                    <Button 
                      as={Link} 
                      href={item.href} 
                      className="text-foreground hover:bg-primary/10 hover:text-primary"
                      variant="light"
                    >
                      {item.label}
                    </Button>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                >
                  <ThemeToggle />
                </motion.div>
              </div>
            </div>
          </div>
        </Navbar>
      </motion.div>
      <motion.main 
        className="bg-background text-foreground"
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.main>
    </div>
  );
} 