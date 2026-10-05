# Prévisualisation locale avec la même version de Jekyll que la publication.
#
# L'Action « Publication du site » construit le site avec actions/jekyll-build-pages@v1
# (v1.0.13), qui utilise le gem github-pages 232, soit Jekyll 3.10.0 et les mêmes plugins.
# Si l'Action change de version, mettre à jour le numéro ci-dessous.
#
# Installation (une fois) : bundle install
# Aperçu                  : bundle exec jekyll serve   →   http://localhost:4000
source "https://rubygems.org"

gem "github-pages", "= 232", group: :jekyll_plugins

# Ruby 3 n'inclut plus WEBrick, nécessaire à « jekyll serve ».
gem "webrick", "~> 1.8"

# Windows : fuseaux horaires (Jekyll en a besoin, Windows ne les fournit pas).
platforms :windows, :jruby do
  gem "tzinfo", ">= 1", "< 3"
  gem "tzinfo-data"
end
