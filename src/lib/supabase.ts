import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xugfivqqhmkzhzwirdp.supabase.co"
const supabaseKey = "sb_publishable_5TYDwXFc6NeGqo_ATrDWbw_Io-8uT3j"

export const supabase = createClient(supabaseUrl, supabaseKey)