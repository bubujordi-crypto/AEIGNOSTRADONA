# Configuració DNS per Resend (evitar SPAM)

Afegeix aquests registres al teu proveïdor de DNS del domini (escoltesiguies.cat o el que usis).

## SPF

**Tipus:** TXT  
**Nom/Host:** `@` (o el domini root)  
**Valor:**
```
v=spf1 include:amazonses.com ~all
```

## DKIM

**Tipus:** TXT  
**Nom/Host:** Resend et donarà un subdomini (semblant a `resend._domainkey` o similar – comprova-ho al panell de Resend)  
**Valor:**
```
p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC2fl6B3vCysvxIr1p+YLIc/bHQbV9FQBzwKl3bRCyt3TTLK7OAnjENdQVo3Vyul241GRcUekoFnPqUoldRidFGugtYzaV6HXB6VCTjeEq0f9tABz4yGb//6M3qBRiiZob1+eknKqQYXlzAanSsM9TKdA8nvy9tlXIfoZIggNpY1wIDAQAB
```

---

**Nota:** El nom exacte del registre DKIM el trobaràs a Resend → Domains → el teu domini. Sol ser alguna cosa com `resend._domainkey.escoltesiguies.cat` o similar.

Quan el domini estigui verificat, afegeix a `.env.local`:
```
RESEND_FROM_EMAIL=contacte@escoltesiguies.cat
```
