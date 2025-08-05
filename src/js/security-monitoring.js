/**
 * Advanced Security and Monitoring System
 * Features: Security headers, SSL monitoring, backup integration, update notifications
 */

class SecurityMonitoringSystem {
    constructor() {
        this.config = {
            securityHeaders: {
                contentSecurityPolicy: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://static.hotjar.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://region1.google-analytics.com https://api.hotjar.com; frame-src 'self' https://www.youtube.com https://player.vimeo.com https://www.facebook.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none';",
                strictTransportSecurity: "max-age=31536000; includeSubDomains; preload",
                xFrameOptions: "DENY",
                xContentTypeOptions: "nosniff",
                referrerPolicy: "strict-origin-when-cross-origin",
                permissionsPolicy: "geolocation=(), microphone=(), camera=()"
            },
            monitoring: {
                checkInterval: 300000, // 5 minutes
                alertThresholds: {
                    responseTime: 5000,
                    errorRate: 0.05,
                    securityScoreMin: 8.5
                }
            },
            backup: {
                enabled: true,
                frequency: 'daily',
                retention: 30, // days
                locations: ['local', 'cloud']
            }
        };
        
        this.securityScore = 0;
        this.monitoringData = [];
        this.lastBackup = null;
        this.securityAlerts = [];
        
        this.init();
    }
    
    init() {
        this.implementSecurityHeaders();
        this.checkSSLStatus();
        this.startSecurityMonitoring();
        this.initializeBackupSystem();
        this.setupUpdateNotifications();
        this.createSecurityDashboard();
        this.bindEvents();
    }
    
    implementSecurityHeaders() {
        // Note: In production, these headers should be set at the server level
        // This is for demonstration and client-side monitoring only
        
        const headers = this.config.securityHeaders;
        
        // Content Security Policy
        if (!document.querySelector('meta[http-equiv="Content-Security-Policy"]')) {
            const cspMeta = document.createElement('meta');
            cspMeta.httpEquiv = 'Content-Security-Policy';
            cspMeta.content = headers.contentSecurityPolicy;
            document.head.appendChild(cspMeta);
        }
        
        // X-Frame-Options equivalent
        if (window.self !== window.top && headers.xFrameOptions === 'DENY') {
            console.warn('Security Alert: Page loaded in frame when X-Frame-Options is DENY');
            this.logSecurityEvent('frame_violation', 'Page loaded in unauthorized frame');
        }
        
        // Referrer Policy
        if (!document.querySelector('meta[name="referrer"]')) {
            const referrerMeta = document.createElement('meta');
            referrerMeta.name = 'referrer';
            referrerMeta.content = headers.referrerPolicy;
            document.head.appendChild(referrerMeta);
        }
        
        this.logSecurityEvent('headers_implemented', 'Security headers implemented');
    }
    
    async checkSSLStatus() {
        try {
            // Check if site is loaded over HTTPS
            if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
                this.addSecurityAlert('warning', 'Site not loaded over HTTPS', 'ssl_missing');
                this.securityScore -= 2;
                return;
            }
            
            // Check certificate validity (in production, this would be done server-side)
            const sslCheck = await this.performSSLCheck();
            
            if (sslCheck.valid) {
                this.logSecurityEvent('ssl_valid', `SSL certificate valid until ${sslCheck.expires}`);
                this.securityScore += 1;
                
                // Check for expiration warning (30 days)
                const daysUntilExpiry = Math.ceil((sslCheck.expires - new Date()) / (1000 * 60 * 60 * 24));
                if (daysUntilExpiry <= 30) {
                    this.addSecurityAlert('warning', `SSL certificate expires in ${daysUntilExpiry} days`, 'ssl_expiring');
                }
            } else {
                this.addSecurityAlert('error', 'SSL certificate invalid or expired', 'ssl_invalid');
                this.securityScore -= 3;
            }
        } catch (error) {
            console.error('SSL check failed:', error);
            this.logSecurityEvent('ssl_check_failed', error.message);
        }
    }
    
    async performSSLCheck() {
        // Simplified SSL check - in production, use a proper SSL monitoring service
        try {
            const response = await fetch('/ssl-info.json', { method: 'HEAD' });
            return {
                valid: response.ok,
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // Mock: 90 days from now
            };
        } catch {
            return {
                valid: location.protocol === 'https:',
                expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
            };
        }
    }
    
    startSecurityMonitoring() {
        // Start periodic security checks
        setInterval(() => {
            this.performSecurityScan();
        }, this.config.monitoring.checkInterval);
        
        // Initial scan
        this.performSecurityScan();
        
        // Monitor for suspicious activity
        this.setupSecurityWatchers();
    }
    
    async performSecurityScan() {
        const scanResults = {
            timestamp: new Date().toISOString(),
            checks: {
                https: location.protocol === 'https:',
                csp: this.checkCSPCompliance(),
                mixedContent: this.checkMixedContent(),
                dependencies: await this.checkDependencySecurity(),
                xss: this.checkXSSProtection(),
                performance: await this.checkPerformanceMetrics()
            }
        };
        
        this.monitoringData.push(scanResults);
        
        // Keep only last 100 scans
        if (this.monitoringData.length > 100) {
            this.monitoringData = this.monitoringData.slice(-100);
        }
        
        this.calculateSecurityScore(scanResults);
        this.updateSecurityDashboard();
        
        this.logSecurityEvent('security_scan', `Security scan completed. Score: ${this.securityScore}`);
    }
    
    checkCSPCompliance() {
        const cspMeta = document.querySelector('meta[http-equiv="Content-Security-Policy"]');
        if (!cspMeta) {
            return { status: 'missing', score: 0 };
        }
        
        const csp = cspMeta.content;
        const requiredDirectives = ['default-src', 'script-src', 'style-src', 'img-src'];
        const hasRequired = requiredDirectives.every(directive => csp.includes(directive));
        
        return {
            status: hasRequired ? 'compliant' : 'incomplete',
            score: hasRequired ? 2 : 1,
            directives: requiredDirectives.filter(d => csp.includes(d))
        };
    }
    
    checkMixedContent() {
        const httpResources = [];
        const allResources = [
            ...Array.from(document.querySelectorAll('script[src]')).map(s => s.src),
            ...Array.from(document.querySelectorAll('link[href]')).map(l => l.href),
            ...Array.from(document.querySelectorAll('img[src]')).map(i => i.src)
        ];
        
        allResources.forEach(url => {
            if (url.startsWith('http://') && location.protocol === 'https:') {
                httpResources.push(url);
            }
        });
        
        return {
            status: httpResources.length === 0 ? 'secure' : 'insecure',
            score: httpResources.length === 0 ? 1 : -2,
            insecureResources: httpResources
        };
    }
    
    async checkDependencySecurity() {
        // In production, this would check against vulnerability databases
        const vulnerablePatterns = [
            /jquery.*[12]\./i, // Old jQuery versions
            /bootstrap.*[23]\./i, // Old Bootstrap versions
            /angular.*1\./i // AngularJS 1.x
        ];
        
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const vulnerabilities = [];
        
        scripts.forEach(script => {
            vulnerablePatterns.forEach(pattern => {
                if (pattern.test(script.src)) {
                    vulnerabilities.push({
                        resource: script.src,
                        risk: 'medium',
                        description: 'Potentially vulnerable dependency detected'
                    });
                }
            });
        });
        
        return {
            status: vulnerabilities.length === 0 ? 'secure' : 'vulnerable',
            score: vulnerabilities.length === 0 ? 1 : -1,
            vulnerabilities
        };
    }
    
    checkXSSProtection() {
        // Check for common XSS vulnerabilities
        const risks = [];
        
        // Check for inline event handlers
        const inlineEvents = document.querySelectorAll('[onclick], [onload], [onerror]');
        if (inlineEvents.length > 0) {
            risks.push('Inline event handlers detected');
        }
        
        // Check for eval usage (simplified check)
        if (window.eval.toString().includes('[native code]')) {
            // eval hasn't been overridden, which is good
        } else {
            risks.push('eval function may have been modified');
        }
        
        return {
            status: risks.length === 0 ? 'protected' : 'at_risk',
            score: risks.length === 0 ? 1 : -1,
            risks
        };
    }
    
    async checkPerformanceMetrics() {
        if (!window.performance) {
            return { status: 'unavailable', score: 0 };
        }
        
        const navigation = performance.getEntriesByType('navigation')[0];
        if (!navigation) {
            return { status: 'unavailable', score: 0 };
        }
        
        const metrics = {
            loadTime: navigation.loadEventEnd - navigation.navigationStart,
            ttfb: navigation.responseStart - navigation.navigationStart,
            domReady: navigation.domContentLoadedEventEnd - navigation.navigationStart
        };
        
        const thresholds = this.config.monitoring.alertThresholds;
        const performanceScore = metrics.loadTime < thresholds.responseTime ? 1 : -1;
        
        return {
            status: performanceScore > 0 ? 'good' : 'slow',
            score: performanceScore,
            metrics
        };
    }
    
    calculateSecurityScore(scanResults) {
        let totalScore = 10; // Start with perfect score
        
        Object.values(scanResults.checks).forEach(check => {
            if (check && typeof check === 'object' && 'score' in check) {
                totalScore += check.score;
            }
        });
        
        // Ensure score is between 0 and 10
        this.securityScore = Math.max(0, Math.min(10, totalScore));
        
        // Alert if score drops below threshold
        if (this.securityScore < this.config.monitoring.alertThresholds.securityScoreMin) {
            this.addSecurityAlert('warning', `Security score dropped to ${this.securityScore.toFixed(1)}`, 'low_security_score');
        }
    }
    
    setupSecurityWatchers() {
        // Monitor for DOM manipulation attacks
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // Element node
                            this.checkNodeSecurity(node);
                        }
                    });
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
            attributeFilter: ['onclick', 'onload', 'onerror', 'src', 'href']
        });
        
        // Monitor console for errors and warnings
        const originalConsoleError = console.error;
        console.error = (...args) => {
            this.logSecurityEvent('console_error', args.join(' '));
            originalConsoleError.apply(console, args);
        };
        
        // Monitor for suspicious network requests
        const originalFetch = window.fetch;
        window.fetch = async (...args) => {
            const url = args[0];
            if (typeof url === 'string' && this.isSuspiciousRequest(url)) {
                this.logSecurityEvent('suspicious_request', `Suspicious fetch to: ${url}`);
            }
            return originalFetch.apply(window, args);
        };
        
        // Monitor for storage access
        this.monitorStorageAccess();
    }
    
    checkNodeSecurity(node) {
        // Check for inline scripts
        if (node.tagName === 'SCRIPT' && node.innerHTML.trim()) {
            this.logSecurityEvent('inline_script_added', 'Inline script added to DOM');
        }
        
        // Check for dangerous attributes
        const dangerousAttrs = ['onclick', 'onload', 'onerror'];
        dangerousAttrs.forEach(attr => {
            if (node.hasAttribute && node.hasAttribute(attr)) {
                this.logSecurityEvent('dangerous_attribute', `Element has ${attr} attribute`);
            }
        });
        
        // Check for external resources
        if (node.src && !node.src.startsWith(location.origin)) {
            this.logSecurityEvent('external_resource', `External resource loaded: ${node.src}`);
        }
    }
    
    isSuspiciousRequest(url) {
        const suspiciousPatterns = [
            /eval\(/i,
            /javascript:/i,
            /data:.*script/i,
            /\.onion/i,
            /malware/i,
            /phishing/i
        ];
        
        return suspiciousPatterns.some(pattern => pattern.test(url));
    }
    
    monitorStorageAccess() {
        // Monitor localStorage access
        const originalSetItem = Storage.prototype.setItem;
        Storage.prototype.setItem = function(key, value) {
            if (key.includes('password') || key.includes('token') || key.includes('secret')) {
                window.securitySystem.logSecurityEvent('sensitive_storage', `Sensitive data stored: ${key}`);
            }
            return originalSetItem.apply(this, arguments);
        };
    }
    
    initializeBackupSystem() {
        if (!this.config.backup.enabled) return;
        
        // Check for existing backups
        this.checkBackupStatus();
        
        // Schedule regular backup checks
        setInterval(() => {
            this.checkBackupStatus();
        }, 24 * 60 * 60 * 1000); // Daily
        
        this.logSecurityEvent('backup_system_initialized', 'Backup monitoring system initialized');
    }
    
    checkBackupStatus() {
        // In production, this would check actual backup status
        const lastBackupTime = localStorage.getItem('last_backup_check') || 0;
        const now = Date.now();
        const daysSinceLastCheck = (now - lastBackupTime) / (1000 * 60 * 60 * 24);
        
        if (daysSinceLastCheck > 1) {
            this.addSecurityAlert('info', 'Backup status check needed', 'backup_check');
            localStorage.setItem('last_backup_check', now.toString());
        }
        
        // Simulate backup status
        this.lastBackup = new Date(now - Math.random() * 24 * 60 * 60 * 1000);
    }
    
    setupUpdateNotifications() {
        // Check for system updates
        this.checkForUpdates();
        
        // Check weekly
        setInterval(() => {
            this.checkForUpdates();
        }, 7 * 24 * 60 * 60 * 1000);
    }
    
    async checkForUpdates() {
        try {
            // In production, this would check for CMS/framework updates
            const currentVersion = '1.0.0'; // This would come from your system
            const updateInfo = await this.fetchUpdateInfo();
            
            if (updateInfo.hasUpdates) {
                this.addSecurityAlert('info', `Updates available: ${updateInfo.version}`, 'updates_available', {
                    currentVersion,
                    newVersion: updateInfo.version,
                    securityFixes: updateInfo.securityFixes
                });
            }
        } catch (error) {
            console.error('Update check failed:', error);
        }
    }
    
    async fetchUpdateInfo() {
        // Simulate update check
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    hasUpdates: Math.random() > 0.8,
                    version: '1.0.1',
                    securityFixes: Math.random() > 0.5
                });
            }, 1000);
        });
    }
    
    createSecurityDashboard() {
        const dashboardHTML = `
            <div id="security-dashboard" class="security-dashboard" style="display: none;">
                <div class="dashboard-header">
                    <h3>Security Dashboard</h3>
                    <button id="close-dashboard" class="close-btn">×</button>
                </div>
                
                <div class="security-score-display">
                    <div class="score-circle">
                        <span class="score-number">${this.securityScore.toFixed(1)}</span>
                        <span class="score-label">Security Score</span>
                    </div>
                    <div class="score-status ${this.getSecurityStatus()}">
                        ${this.getSecurityStatusText()}
                    </div>
                </div>
                
                <div class="security-checks" id="security-checks">
                    <!-- Security checks will be populated here -->
                </div>
                
                <div class="security-alerts" id="security-alerts">
                    <h4>Recent Alerts</h4>
                    <div class="alerts-list">
                        <!-- Alerts will be populated here -->
                    </div>
                </div>
                
                <div class="security-actions">
                    <button id="run-security-scan" class="action-btn primary">Run Security Scan</button>
                    <button id="export-security-report" class="action-btn secondary">Export Report</button>
                </div>
            </div>
            
            <button id="security-dashboard-toggle" class="security-toggle" title="Security Dashboard">
                🛡️
                <span class="security-badge ${this.getSecurityStatus()}">${this.securityScore.toFixed(1)}</span>
            </button>
        `;
        
        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        this.addDashboardStyles();
        this.updateSecurityDashboard();
    }
    
    addDashboardStyles() {
        const styles = `
            .security-toggle {
                position: fixed;
                bottom: 80px;
                right: 20px;
                width: 60px;
                height: 60px;
                border-radius: 50%;
                background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                box-shadow: 0 4px 15px rgba(0,0,0,0.2);
                z-index: 1000;
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                gap: 2px;
            }
            
            .security-badge {
                position: absolute;
                top: -5px;
                right: -5px;
                background: #28a745;
                color: white;
                border-radius: 10px;
                padding: 2px 6px;
                font-size: 0.7rem;
                font-weight: 600;
            }
            
            .security-badge.warning {
                background: #ffc107;
                color: #333;
            }
            
            .security-badge.error {
                background: #dc3545;
            }
            
            .security-dashboard {
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                width: 600px;
                max-width: 90vw;
                max-height: 90vh;
                background: white;
                border-radius: 12px;
                box-shadow: 0 20px 60px rgba(0,0,0,0.3);
                z-index: 10000;
                overflow-y: auto;
            }
            
            .dashboard-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                background: linear-gradient(135deg, #2c5530 0%, #1a3d1f 100%);
                color: white;
                border-radius: 12px 12px 0 0;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .close-btn:hover {
                background: rgba(255,255,255,0.1);
            }
            
            .security-score-display {
                padding: 2rem;
                text-align: center;
                background: #f8f9fa;
            }
            
            .score-circle {
                display: inline-block;
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: conic-gradient(#28a745 0deg ${this.securityScore * 36}deg, #e9ecef ${this.securityScore * 36}deg 360deg);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                position: relative;
                margin-bottom: 1rem;
            }
            
            .score-circle::before {
                content: '';
                position: absolute;
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background: white;
            }
            
            .score-number {
                font-size: 2rem;
                font-weight: 700;
                color: #2c5530;
                z-index: 1;
            }
            
            .score-label {
                font-size: 0.8rem;
                color: #666;
                z-index: 1;
            }
            
            .score-status {
                padding: 0.5rem 1rem;
                border-radius: 25px;
                font-weight: 600;
                display: inline-block;
            }
            
            .score-status.good {
                background: #d4edda;
                color: #155724;
            }
            
            .score-status.warning {
                background: #fff3cd;
                color: #856404;
            }
            
            .score-status.error {
                background: #f8d7da;
                color: #721c24;
            }
            
            .security-checks {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
            }
            
            .check-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 0.75rem 0;
                border-bottom: 1px solid #f0f0f0;
            }
            
            .check-item:last-child {
                border-bottom: none;
            }
            
            .check-status {
                padding: 0.25rem 0.75rem;
                border-radius: 15px;
                font-size: 0.8rem;
                font-weight: 600;
            }
            
            .check-status.pass {
                background: #d4edda;
                color: #155724;
            }
            
            .check-status.warning {
                background: #fff3cd;
                color: #856404;
            }
            
            .check-status.fail {
                background: #f8d7da;
                color: #721c24;
            }
            
            .security-alerts {
                padding: 1.5rem;
                border-bottom: 1px solid #e9ecef;
                max-height: 200px;
                overflow-y: auto;
            }
            
            .alert-item {
                display: flex;
                align-items: flex-start;
                gap: 0.75rem;
                padding: 0.75rem;
                margin-bottom: 0.5rem;
                border-radius: 6px;
                font-size: 0.9rem;
            }
            
            .alert-item.info {
                background: #d1ecf1;
                color: #0c5460;
            }
            
            .alert-item.warning {
                background: #fff3cd;
                color: #856404;
            }
            
            .alert-item.error {
                background: #f8d7da;
                color: #721c24;
            }
            
            .alert-icon {
                font-size: 1rem;
                margin-top: 0.1rem;
            }
            
            .alert-content {
                flex: 1;
            }
            
            .alert-time {
                font-size: 0.8rem;
                opacity: 0.7;
                margin-top: 0.25rem;
            }
            
            .security-actions {
                padding: 1.5rem;
                display: flex;
                gap: 1rem;
                justify-content: center;
            }
            
            .action-btn {
                padding: 0.75rem 1.5rem;
                border: none;
                border-radius: 6px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .action-btn.primary {
                background: #2c5530;
                color: white;
            }
            
            .action-btn.primary:hover {
                background: #1a3d1f;
            }
            
            .action-btn.secondary {
                background: #6c757d;
                color: white;
            }
            
            .action-btn.secondary:hover {
                background: #545b62;
            }
            
            @media (max-width: 768px) {
                .security-dashboard {
                    width: 95vw;
                    height: 95vh;
                }
                
                .security-actions {
                    flex-direction: column;
                }
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
    
    updateSecurityDashboard() {
        const checksContainer = document.getElementById('security-checks');
        const alertsContainer = document.querySelector('.alerts-list');
        const scoreNumber = document.querySelector('.score-number');
        const scoreStatus = document.querySelector('.score-status');
        const securityBadge = document.querySelector('.security-badge');
        
        if (scoreNumber) {
            scoreNumber.textContent = this.securityScore.toFixed(1);
        }
        
        if (scoreStatus) {
            scoreStatus.className = `score-status ${this.getSecurityStatus()}`;
            scoreStatus.textContent = this.getSecurityStatusText();
        }
        
        if (securityBadge) {
            securityBadge.className = `security-badge ${this.getSecurityStatus()}`;
            securityBadge.textContent = this.securityScore.toFixed(1);
        }
        
        if (checksContainer && this.monitoringData.length > 0) {
            const latestScan = this.monitoringData[this.monitoringData.length - 1];
            const checksHTML = Object.entries(latestScan.checks).map(([key, result]) => {
                const status = this.getCheckStatus(result);
                return `
                    <div class="check-item">
                        <span>${this.formatCheckName(key)}</span>
                        <span class="check-status ${status.class}">${status.text}</span>
                    </div>
                `;
            }).join('');
            
            checksContainer.innerHTML = checksHTML;
        }
        
        if (alertsContainer) {
            const alertsHTML = this.securityAlerts.slice(-5).reverse().map(alert => `
                <div class="alert-item ${alert.level}">
                    <span class="alert-icon">${this.getAlertIcon(alert.level)}</span>
                    <div class="alert-content">
                        <strong>${alert.message}</strong>
                        <div class="alert-time">${new Date(alert.timestamp).toLocaleString()}</div>
                    </div>
                </div>
            `).join('');
            
            alertsContainer.innerHTML = alertsHTML || '<p>No recent alerts</p>';
        }
    }
    
    bindEvents() {
        // Dashboard toggle
        document.getElementById('security-dashboard-toggle')?.addEventListener('click', () => {
            const dashboard = document.getElementById('security-dashboard');
            dashboard.style.display = dashboard.style.display === 'none' ? 'block' : 'none';
        });
        
        // Close dashboard
        document.getElementById('close-dashboard')?.addEventListener('click', () => {
            document.getElementById('security-dashboard').style.display = 'none';
        });
        
        // Run security scan
        document.getElementById('run-security-scan')?.addEventListener('click', () => {
            this.performSecurityScan();
        });
        
        // Export report
        document.getElementById('export-security-report')?.addEventListener('click', () => {
            this.exportSecurityReport();
        });
        
        // Close dashboard when clicking outside
        document.getElementById('security-dashboard')?.addEventListener('click', (e) => {
            if (e.target.id === 'security-dashboard') {
                document.getElementById('security-dashboard').style.display = 'none';
            }
        });
    }
    
    // Utility methods
    getSecurityStatus() {
        if (this.securityScore >= 8) return 'good';
        if (this.securityScore >= 6) return 'warning';
        return 'error';
    }
    
    getSecurityStatusText() {
        if (this.securityScore >= 8) return 'Excellent Security';
        if (this.securityScore >= 6) return 'Good Security';
        if (this.securityScore >= 4) return 'Needs Improvement';
        return 'Critical Issues';
    }
    
    getCheckStatus(result) {
        if (!result || typeof result !== 'object') {
            return { class: 'warning', text: 'Unknown' };
        }
        
        if (result.score > 0) return { class: 'pass', text: 'Pass' };
        if (result.score === 0) return { class: 'warning', text: 'Warning' };
        return { class: 'fail', text: 'Fail' };
    }
    
    formatCheckName(key) {
        return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
    }
    
    getAlertIcon(level) {
        switch (level) {
            case 'error': return '🚨';
            case 'warning': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📋';
        }
    }
    
    logSecurityEvent(type, message, data = null) {
        const event = {
            type,
            message,
            data,
            timestamp: new Date().toISOString(),
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        console.log(`[Security] ${type}: ${message}`, data);
        
        // Store in localStorage for persistence
        const events = JSON.parse(localStorage.getItem('security_events') || '[]');
        events.push(event);
        
        // Keep only last 100 events
        if (events.length > 100) {
            events.splice(0, events.length - 100);
        }
        
        localStorage.setItem('security_events', JSON.stringify(events));
        
        // Track in analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'security_event', {
                event_category: 'Security',
                event_label: type,
                custom_parameter_1: message
            });
        }
    }
    
    addSecurityAlert(level, message, type, data = null) {
        const alert = {
            id: Date.now() + Math.random(),
            level,
            message,
            type,
            data,
            timestamp: new Date().toISOString()
        };
        
        this.securityAlerts.push(alert);
        
        // Keep only last 50 alerts
        if (this.securityAlerts.length > 50) {
            this.securityAlerts = this.securityAlerts.slice(-50);
        }
        
        // Update dashboard if visible
        if (document.getElementById('security-dashboard').style.display !== 'none') {
            this.updateSecurityDashboard();
        }
        
        // Log the alert
        this.logSecurityEvent('security_alert', `${level.toUpperCase()}: ${message}`, data);
    }
    
    exportSecurityReport() {
        const report = {
            timestamp: new Date().toISOString(),
            securityScore: this.securityScore,
            status: this.getSecurityStatusText(),
            monitoringData: this.monitoringData,
            alerts: this.securityAlerts,
            config: this.config,
            environment: {
                userAgent: navigator.userAgent,
                url: window.location.href,
                protocol: location.protocol,
                referrer: document.referrer
            }
        };
        
        const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `security-report-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.logSecurityEvent('report_exported', 'Security report exported');
    }
    
    // Public API methods
    getSecurityScore() {
        return this.securityScore;
    }
    
    getSecurityAlerts() {
        return this.securityAlerts;
    }
    
    getMonitoringData() {
        return this.monitoringData;
    }
    
    forceSecurityScan() {
        return this.performSecurityScan();
    }
    
    addCustomSecurityCheck(name, checkFunction) {
        // Allow custom security checks to be added
        this.customChecks = this.customChecks || {};
        this.customChecks[name] = checkFunction;
    }
    
    // Emergency security response
    triggerSecurityLockdown() {
        // In a real emergency, this might disable certain features
        this.addSecurityAlert('error', 'Security lockdown activated', 'lockdown');
        this.logSecurityEvent('security_lockdown', 'Emergency security lockdown triggered');
        
        // Disable potentially dangerous features
        window.eval = () => {
            throw new Error('eval() disabled for security reasons');
        };
        
        // Clear sensitive data from storage
        const sensitiveKeys = Object.keys(localStorage).filter(key => 
            key.includes('password') || key.includes('token') || key.includes('secret')
        );
        
        sensitiveKeys.forEach(key => {
            localStorage.removeItem(key);
        });
        
        return true;
    }
}

// Initialize security system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.securitySystem = new SecurityMonitoringSystem();
});

// Export for external use
window.SecurityMonitoringSystem = SecurityMonitoringSystem;