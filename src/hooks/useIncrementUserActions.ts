

export default function incrementUserActions() {
  // 1. Busca o valor atual (lembrando que vem como string)
  const actualActions = localStorage.getItem("dodaily_user_actions")
  
  // 2. Converte para número. Se não existir (for null), assume 0
  const totalActions = actualActions ? parseInt(actualActions, 10) : 0
  
  // 3. Soma mais uma ação
  const newTotal = totalActions + 1
  
  // 4. Salva de volta como string
  localStorage.setItem("dodaily_user_actions", newTotal.toString())
}