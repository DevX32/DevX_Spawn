fx_version "cerulean"
lua54 'yes'
game "gta5"

ui_page 'web/build/index.html'

client_scripts {
--	'@qbx_core/modules/playerdata.lua',
	'client/**/*'
}

server_scripts "server/**/*"

files {
  'web/build/index.html',
  'web/build/**/*'
}