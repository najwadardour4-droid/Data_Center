@extends('layouts.app')

@section('title', 'Accueil - DCIM')

@push('styles')
<style>
    body {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }

    /* Hero Section */
    .hero {
        max-width: 1200px;
        margin: 0 auto;
        padding: 4rem 2rem;
        text-align: center;
        color: white;
    }

    .hero h1 {
        font-size: 3rem;
        margin-bottom: 1.5rem;
        font-weight: 800;
        line-height: 1.2;
    }

    .hero p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.95;
        max-width: 700px;
        margin-left: auto;
        margin-right: auto;
    }

    .hero-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        margin-bottom: 3rem;
    }

    .btn-primary, .btn-secondary {
        padding: 1rem 2rem;
        border-radius: 10px;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s;
        font-size: 1.1rem;
        display: inline-block;
    }

    .btn-primary {
        background: white;
        color: #667eea;
    }

    .btn-primary:hover {
        transform: translateY(-3px);
        box-shadow: 0 8px 20px rgba(0,0,0,0.2);
    }

    .btn-secondary {
        background: rgba(255, 255, 255, 0.2);
        color: white;
        border: 2px solid white;
    }

    .btn-secondary:hover {
        background: rgba(255, 255, 255, 0.3);
    }

    /* Stats Section */
    .stats {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1.5rem;
        margin-top: 3rem;
    }

    .stat-card {
        background: rgba(255, 255, 255, 0.15);
        backdrop-filter: blur(10px);
        padding: 1.5rem;
        border-radius: 12px;
        border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .stat-number {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .stat-label {
        opacity: 0.9;
        font-size: 0.95rem;
    }

    /* Features Section */
    .features {
        background: white;
        padding: 5rem 2rem;
    }

    .features-container {
        max-width: 1200px;
        margin: 0 auto;
    }

    .section-title {
        text-align: center;
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: #2d3748;
    }

    .section-subtitle {
        text-align: center;
        color: #718096;
        margin-bottom: 3rem;
        font-size: 1.1rem;
    }

    .features-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
        gap: 2rem;
    }

    .feature-card {
        padding: 2rem;
        border-radius: 12px;
        background: #f7fafc;
        border: 2px solid transparent;
        transition: all 0.3s;
    }

    .feature-card:hover {
        border-color: #667eea;
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(102, 126, 234, 0.2);
    }

    .feature-icon {
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 1.5rem;
        margin-bottom: 1rem;
    }

    .feature-card h3 {
        font-size: 1.3rem;
        margin-bottom: 0.8rem;
        color: #2d3748;
    }

    .feature-card p {
        color: #718096;
        line-height: 1.6;
    }

    @media (max-width: 768px) {
        .hero h1 {
            font-size: 2rem;
        }
        
        .hero-buttons {
            flex-direction: column;
        }
    }
</style>
@endpush

@section('content')
<!-- Hero Section -->
<section class="hero">
    <h1>Data Center Infrastructure Management</h1>
    <p>Gérez efficacement vos ressources informatiques avec notre plateforme de réservation et suivi en temps réel</p>
    
    <div class="hero-buttons">
        @guest
            <a href="{{ route('register') }}" class="btn-primary">Commencer maintenant</a>
        @else
            <a href="{{ route('dashboard') }}" class="btn-primary">Mon tableau de bord</a>
        @endguest
        <a href="{{ route('resources.index') }}" class="btn-secondary">Explorer les ressources</a>
    </div>

    <div class="stats">
        <div class="stat-card">
            <div class="stat-number">{{ $totalResources ?? '250+' }}</div>
            <div class="stat-label">Ressources disponibles</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ $utilizationRate ?? '85%' }}</div>
            <div class="stat-label">Taux d'utilisation</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">{{ $activeReservations ?? '500+' }}</div>
            <div class="stat-label">Réservations actives</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">24/7</div>
            <div class="stat-label">Support disponible</div>
        </div>
    </div>
</section>

<!-- Features Section -->
<section class="features">
    <div class="features-container">
        <h2 class="section-title">Fonctionnalités Principales</h2>
        <p class="section-subtitle">Tout ce dont vous avez besoin pour gérer votre infrastructure</p>
        
        <div class="features-grid">
            <div class="feature-card">
                <div class="feature-icon">📊</div>
                <h3>Tableaux de bord</h3>
                <p>Visualisez en temps réel l'état de vos ressources avec des statistiques détaillées et des graphiques interactifs</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔒</div>
                <h3>Sécurité renforcée</h3>
                <p>Authentification Laravel, gestion des rôles et permissions, journalisation complète des actions</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">⚡</div>
                <h3>Réservation instantanée</h3>
                <p>Système automatique de vérification des disponibilités et gestion intelligente des conflits</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🔔</div>
                <h3>Notifications en temps réel</h3>
                <p>Restez informé des changements de statut, maintenances planifiées et expirations de réservations</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">📈</div>
                <h3>Suivi et traçabilité</h3>
                <p>Historique complet des réservations avec filtres avancés par date, ressource ou état</p>
            </div>
            
            <div class="feature-card">
                <div class="feature-icon">🛠️</div>
                <h3>Gestion de maintenance</h3>
                <p>Planification des périodes de maintenance avec notifications automatiques aux utilisateurs</p>
            </div>
        </div>
    </div>
</section>
@endsection