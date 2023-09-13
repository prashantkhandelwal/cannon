# Configure the Azure provider
terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~> 3.0.2"
    }
    random = {
      source  = "hashicorp/random"
      version = "~>3.0"
    }
  }

  required_version = ">= 1.1.0"
}

provider "azurerm" {
  features {}
}

resource "random_pet" "rg_name" {
  prefix = var.resource_group_name_prefix
}

resource "azurerm_resource_group" "rg" {
  name     = random_pet.rg_name.id
  location = var.resource_group_location
}

resource "random_string" "container_name" {
  length  = 20
  lower   = true
  upper   = false
  special = false
}

resource "azurerm_storage_account" "storage_account" {
  name                     = "${random_string.container_name.result}sa"
  resource_group_name      = azurerm_resource_group.rg.name
  location                 = azurerm_resource_group.rg.location
  account_tier             = "Standard"
  account_replication_type = "LRS"

  tags = {
    environment = "staging"
  }
}

resource "azurerm_storage_share" "fileshare" {
  name                 = "sharename"
  storage_account_name = azurerm_storage_account.storage_account.name
  quota                = 1
}

resource "azurerm_storage_share_directory" "sharingdirectorylogs" {
  name = "logs"
  share_name = azurerm_storage_share.fileshare.name
  storage_account_name = azurerm_storage_account.storage_account.name
}

resource "azurerm_storage_share_directory" "sharingdirectorytest" {
  name = "tests"
  share_name = azurerm_storage_share.fileshare.name
  storage_account_name = azurerm_storage_account.storage_account.name
}

resource "azurerm_storage_share_file" "sharingscript" {
  name = "tests/script_eastus.js"
  storage_share_id = azurerm_storage_share.fileshare.id
  source = abspath("D:\\Work\\Github Clones\\Learnings\\Hackathon\\Cannon\\k6-server\\script.js")
}

resource "azurerm_container_group" "container" {
  name                = "${var.container_group_name_prefix}-${random_string.container_name.result}"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  ip_address_type     = "Public"
  os_type             = "Linux"
  restart_policy      = var.restart_policy


  container {
    name   = "${var.container_name_prefix}-${random_string.container_name.result}"
    image  = var.image
    cpu    = var.cpu_cores
    memory = var.memory_in_gb

    ports {
      port     = var.port
      protocol = "TCP"
    }

    volume {
      name = "results"
      storage_account_name = azurerm_storage_account.storage_account.name
      storage_account_key  = azurerm_storage_account.storage_account.primary_access_key
      share_name           = azurerm_storage_share.fileshare.name
      mount_path           = "/results"
    }

    commands = [
      "k6",
      "run",
      "--duration",
      "10s",
      "--vus",
      "5",
      "/results/tests/script_eastus.js",
      "--out",
      "json=/results/logs/test_results_eastus.json"
    ]
  }
}
