#!/bin/bash

# Script untuk deployment CrimsonRealm ke berbagai platform
# Usage: ./deploy.sh [platform]
# Example: ./deploy.sh github-pages

# Warna untuk output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function untuk menampilkan bantuan
show_help() {
  echo -e "${YELLOW}CrimsonRealm Deployment Script${NC}"
  echo -e "Usage: ./deploy.sh [platform]"
  echo -e ""
  echo -e "Platforms:"
  echo -e "  github-pages   Deploy ke GitHub Pages"
  echo -e "  vercel         Deploy ke Vercel"
  echo -e "  railway        Deploy ke Railway"
  echo -e "  all            Deploy ke semua platform"
  echo -e ""
  echo -e "Example: ./deploy.sh github-pages"
}

# Function untuk deploy ke GitHub Pages
deploy_github_pages() {
  echo -e "${YELLOW}Deploying to GitHub Pages...${NC}"
  
  # Cek jika gh-pages package terinstal
  if ! npm list -g gh-pages > /dev/null 2>&1; then
    echo -e "${YELLOW}Installing gh-pages package...${NC}"
    npm install -g gh-pages
  fi
  
  # Build untuk GitHub Pages
  echo -e "${YELLOW}Building for GitHub Pages...${NC}"
  VITE_GITHUB_PAGES_API_URL=${API_URL:-https://crimson-realm-api.vercel.app} npm run build
  
  # Prepare untuk GitHub Pages
  echo -e "${YELLOW}Preparing for GitHub Pages...${NC}"
  node github-pages-prepare.js ${REPO_NAME:-crimsonrealm}
  
  # Deploy ke GitHub Pages
  echo -e "${YELLOW}Deploying to gh-pages branch...${NC}"
  gh-pages -d dist
  
  echo -e "${GREEN}✅ Deployed to GitHub Pages${NC}"
}

# Function untuk deploy ke Vercel
deploy_vercel() {
  echo -e "${YELLOW}Deploying to Vercel...${NC}"
  
  # Cek jika Vercel CLI terinstal
  if ! command -v vercel &> /dev/null; then
    echo -e "${YELLOW}Installing Vercel CLI...${NC}"
    npm install -g vercel
  fi
  
  # Deploy ke Vercel
  echo -e "${YELLOW}Running Vercel deployment...${NC}"
  vercel --prod
  
  echo -e "${GREEN}✅ Deployed to Vercel${NC}"
}

# Function untuk deploy ke Railway
deploy_railway() {
  echo -e "${YELLOW}Deploying to Railway...${NC}"
  
  # Cek jika Railway CLI terinstal
  if ! command -v railway &> /dev/null; then
    echo -e "${YELLOW}Installing Railway CLI...${NC}"
    npm install -g @railway/cli
  fi
  
  # Deploy ke Railway
  echo -e "${YELLOW}Running Railway deployment...${NC}"
  railway up
  
  echo -e "${GREEN}✅ Deployed to Railway${NC}"
}

# Main script logic
if [ $# -eq 0 ]; then
  show_help
  exit 0
fi

# Process command
case "$1" in
  "github-pages")
    deploy_github_pages
    ;;
  "vercel")
    deploy_vercel
    ;;
  "railway")
    deploy_railway
    ;;
  "all")
    deploy_github_pages
    deploy_vercel
    deploy_railway
    ;;
  *)
    echo -e "${RED}❌ Unknown platform: $1${NC}"
    show_help
    exit 1
    ;;
esac

exit 0