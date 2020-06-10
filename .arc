@app
begin-app

@static
folder dist

@http

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
