// @module:platform-core @layer:ui @owner:studio
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, Rocket } from "lucide-react";
import Link from "next/link";

// >>> BEGIN gen:core.home (layer:ui)
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-primary text-primary-foreground">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-4 text-center">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none font-headline">
              M'Student Platform
            </h1>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl">
              A modern, modular, and intelligent platform for educational management.
              Built with a robust layered architecture for maximum flexibility.
            </p>
            <div className="space-x-4">
              <Button asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button variant="secondary" asChild>
                <Link href="/getting-started">
                  <Rocket className="mr-2"/>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid items-center gap-6 lg:grid-cols-3 lg:gap-12">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-body">Modular by Design</CardTitle>
                <GraduationCap className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">Lego-like</div>
                <p className="text-xs text-muted-foreground">
                  Enable or disable features like authentication and user management on the fly.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-body">User Management</CardTitle>
                <Users className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">Centralized</div>
                <p className="text-xs text-muted-foreground">
                  A dedicated module for viewing and managing student and staff profiles.
                </p>
              </CardContent>
            </card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium font-body">Layered Architecture</CardTitle>
                <BookOpen className="w-4 h-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold font-headline">Clean & Clear</div>
                <p className="text-xs text-muted-foreground">
                  Strict separation of concerns from UI to database for ultimate maintainability.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
// <<< END gen:core.home
