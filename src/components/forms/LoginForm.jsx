import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingButton } from "../buttons/LoadingButton"

export function LoginForm({
  onSubmit,
  setUsername,
  setPassword,
  isButtonLoading,
  ...props
}){
  return (
    <div className={cn("flex flex-col gap-6")} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Entrar</CardTitle>
          <CardDescription>
            Entre com seu usuário no sistema
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="usuario">Usuário</Label>
                <Input
                  id="usuario"
                  placeholder="kenned.ferreira"
                  required
                  onChange={e => setUsername(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input id="password" type="password" required  onChange={e => setPassword(e.target.value)}/>
               
              </div>
              <LoadingButton label="Entrar" loading={isButtonLoading}/>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
