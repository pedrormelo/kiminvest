"use client"

import { useState } from "react"
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Switch, Dimensions } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryArea } from "victory-native"
import { LinearGradient } from "expo-linear-gradient"

const { width } = Dimensions.get("window")

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState("Inicio")
  const [balanceVisible, setBalanceVisible] = useState(true)

  const [pricePerShare, setPricePerShare] = useState("")
  const [lastDividend, setLastDividend] = useState("")
  const [monthlyInvestment, setMonthlyInvestment] = useState("")
  const [investmentYears, setInvestmentYears] = useState("")
  const [initialShares, setInitialShares] = useState("")
  const [reinvestDividends, setReinvestDividends] = useState(true)
  const [result, setResult] = useState(null)

  const calculateInvestment = () => {
    const price = Number.parseFloat(pricePerShare)
    const dividend = Number.parseFloat(lastDividend)
    const monthly = Number.parseFloat(monthlyInvestment)
    const years = Number.parseInt(investmentYears)
    const initial = Number.parseInt(initialShares)

    if (isNaN(price) || isNaN(dividend) || isNaN(monthly) || isNaN(years) || isNaN(initial)) {
      setResult("Preencha todos os campos corretamente.")
      return
    }

    let totalShares = initial
    let totalInvested = 0

    for (let month = 0; month < years * 12; month++) {
      totalInvested += monthly
      if (reinvestDividends) {
        const receivedDividends = totalShares * dividend
        const newSharesFromDividends = receivedDividends / price
        totalShares += newSharesFromDividends
      }
      const newSharesFromInvestment = monthly / price
      totalShares += newSharesFromInvestment
    }

    const totalValue = totalShares * price
    setResult(totalValue.toFixed(2))
  }


  const chartData = [
    { category: "KIMINVEST", value: 75, fill: "#FFFFFF" },
    { category: "Outros Apps", value: 25, fill: "#AAAAAA" },
    { category: "Gastos", value: 41, fill: "#666666" },
  ]

  const performanceData = [
    { month: "Jan", value: 1200 },
    { month: "Fev", value: 1350 },
    { month: "Mar", value: 1280 },
    { month: "Abr", value: 1450 },
    { month: "Mai", value: 1512 },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case "Inicio":
        return (
          <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
            {/* Header Section */}
            <View style={styles.headerSection}>
              <View style={styles.greetingContainer}>
                <Text style={styles.greeting}>Olá,</Text>
                <Text style={styles.username}>Antonio Henrique 👋</Text>
              </View>

              <TouchableOpacity style={styles.notificationButton}>
                <Ionicons name="notifications-outline" size={24} color="#AAAAAA" />
              </TouchableOpacity>
            </View>

            {/* Balance Card */}
            <LinearGradient
              colors={["#222222", "#000000"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.balanceCard}
            >
              <View style={styles.balanceHeader}>
                <Text style={styles.balanceLabel}>Saldo Total</Text>
                <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                  <Ionicons name={balanceVisible ? "eye-outline" : "eye-off-outline"} size={24} color="white" />
                </TouchableOpacity>
              </View>
              <Text style={styles.balance}>{balanceVisible ? "R$ 1.512,35" : "R$ ••••••"}</Text>
              <View style={styles.balanceFooter}>
                <View style={styles.changeIndicator}>
                  <Ionicons name="trending-up" size={16} color="#10B981" />
                  <Text style={styles.changeText}>+12.5% este mês</Text>
                </View>
              </View>
            </LinearGradient>

            {/* Quick Actions */}
            <View style={styles.quickActions}>
              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Ionicons name="add" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionText}>Investir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Ionicons name="swap-horizontal" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionText}>Transferir</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Ionicons name="card-outline" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionText}>Carteira</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.actionButton}>
                <View style={styles.actionIcon}>
                  <Ionicons name="analytics" size={24} color="#FFFFFF" />
                </View>
                <Text style={styles.actionText}>Relatórios</Text>
              </TouchableOpacity>
            </View>

            {/* Performance Chart */}
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Performance (6 meses)</Text>
                <View style={styles.chartPeriod}>
                  <Text style={styles.periodText}>6M</Text>
                </View>
              </View>

              <VictoryChart width={width - 64} height={180} padding={{ left: 50, top: 20, right: 20, bottom: 40 }}>
                <VictoryArea
                  data={performanceData}
                  x="month"
                  y="value"
                  style={{
                    data: {
                      fill: "url(#gradient)",
                      fillOpacity: 0.3,
                      stroke: "#FFFFFF",
                      strokeWidth: 3,
                    },
                  }}
                  animate={{
                    duration: 1500,
                    onLoad: { duration: 1000 },
                  }}
                />
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `R$${x}`}
                  style={{
                    tickLabels: { fontSize: 12, fill: "#AAAAAA" },
                    grid: { stroke: "#333333", strokeWidth: 1 },
                  }}
                />
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 12, fill: "#AAAAAA" },
                    axis: { stroke: "#333333", strokeWidth: 1 },
                  }}
                />
              </VictoryChart>
            </View>

            {/* Statistics Card */}
            <View style={styles.chartCard}>
              <View style={styles.chartHeader}>
                <Text style={styles.chartTitle}>Distribuição de Investimentos</Text>
                <TouchableOpacity>
                  <Ionicons name="information-circle-outline" size={20} color="#AAAAAA" />
                </TouchableOpacity>
              </View>

              <VictoryChart
                width={width - 64}
                height={220}
                domainPadding={40}
                padding={{ left: 60, top: 20, right: 60, bottom: 60 }}
              >
                <VictoryAxis
                  dependentAxis
                  tickFormat={(x) => `${x}%`}
                  style={{
                    tickLabels: { fontSize: 12, fill: "#AAAAAA" },
                    grid: { stroke: "#333333", strokeWidth: 1 },
                  }}
                />
                <VictoryAxis
                  style={{
                    tickLabels: { fontSize: 11, fill: "#AAAAAA", angle: -45 },
                    axis: { stroke: "#333333", strokeWidth: 1 },
                  }}
                />
                <VictoryBar
                  data={chartData}
                  x="category"
                  y="value"
                  style={{
                    data: {
                      fill: ({ datum }) => datum.fill,
                      fillOpacity: 0.9,
                      strokeWidth: 0,
                    },
                  }}
                  animate={{
                    duration: 1000,
                    onLoad: { duration: 500 },
                  }}
                  cornerRadius={{ top: 8 }}
                  labelComponent={
                    <VictoryLabel style={{ fill: "#FFFFFF", fontSize: 14, fontWeight: "600" }} dy={-15} />
                  }
                  labels={({ datum }) => `${datum.value}%`}
                />
              </VictoryChart>

              {/* Legend */}
              <View style={styles.legend}>
                {chartData.map((item, index) => (
                  <View key={index} style={styles.legendItem}>
                    <View style={[styles.legendColor, { backgroundColor: item.fill }]} />
                    <Text style={styles.legendText}>{item.category}</Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>
        )

      case "Calculadora":
        return (
          <ScrollView contentContainerStyle={styles.calculatorContainer} showsVerticalScrollIndicator={false}>
            <View style={styles.calculatorHeader}>
              <Ionicons name="calculator" size={32} color="#FFFFFF" />
              <Text style={styles.calculatorTitle}>Calculadora de Investimentos</Text>
              <Text style={styles.calculatorSubtitle}>Simule seus rendimentos futuros</Text>
            </View>

            <View style={styles.inputCard}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Preço da Cota</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0,00"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="numeric"
                    value={pricePerShare}
                    onChangeText={setPricePerShare}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Último Rendimento</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0,00"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="numeric"
                    value={lastDividend}
                    onChangeText={setLastDividend}
                  />
                </View>
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Investimento Mensal</Text>
                <View style={styles.inputContainer}>
                  <Text style={styles.currencySymbol}>R$</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0,00"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="numeric"
                    value={monthlyInvestment}
                    onChangeText={setMonthlyInvestment}
                  />
                </View>
              </View>

              <View style={styles.inputRow}>
                <View style={[styles.inputGroup, { flex: 1, marginRight: 8 }]}>
                  <Text style={styles.inputLabel}>Prazo (anos)</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="5"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="numeric"
                    value={investmentYears}
                    onChangeText={setInvestmentYears}
                  />
                </View>

                <View style={[styles.inputGroup, { flex: 1, marginLeft: 8 }]}>
                  <Text style={styles.inputLabel}>Cotas Iniciais</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor="#AAAAAA"
                    keyboardType="numeric"
                    value={initialShares}
                    onChangeText={setInitialShares}
                  />
                </View>
              </View>

              <View style={styles.switchContainer}>
                <View style={styles.switchInfo}>
                  <Text style={styles.switchLabel}>Reinvestir dividendos</Text>
                  <Text style={styles.switchDescription}>Maximize seus ganhos com juros compostos</Text>
                </View>
                <Switch
                  value={reinvestDividends}
                  onValueChange={setReinvestDividends}
                  trackColor={{ false: "#444444", true: "#666666" }}
                  thumbColor={reinvestDividends ? "#FFFFFF" : "#AAAAAA"}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.calculateButton} onPress={calculateInvestment}>
              <LinearGradient
                colors={["#FFFFFF", "#DDDDDD"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.buttonGradient}
              >
                <Ionicons name="calculator" size={20} color="#000000" />
                <Text style={styles.buttonText}>Calcular Investimento</Text>
              </LinearGradient>
            </TouchableOpacity>

            {result !== null && (
              <View style={styles.resultCard}>
                <View style={styles.resultHeader}>
                  <Ionicons name="trending-up" size={24} color="#10B981" />
                  <Text style={styles.resultTitle}>Resultado da Simulação</Text>
                </View>
                <Text style={styles.resultValue}>R$ {result}</Text>
                <Text style={styles.resultDescription}>Valor estimado após {investmentYears} anos de investimento</Text>
              </View>
            )}
          </ScrollView>
        )

      case "EmAlta":
        return (
          <ScrollView style={styles.centerContent} showsVerticalScrollIndicator={false}>
            <View style={styles.emAltaHeader}>
              <Ionicons name="flame" size={32} color="#F59E0B" />
              <Text style={styles.sectionTitle}>Fundos em Alta</Text>
              <Text style={styles.sectionSubtitle}>Os investimentos mais promissores</Text>
            </View>

            <View style={styles.fundCard}>
              <View style={styles.fundHeader}>
                <View style={styles.fundIcon}>
                  <Ionicons name="trending-up" size={24} color="#10B981" />
                </View>
                <View style={styles.fundInfo}>
                  <Text style={styles.fundName}>KIMINVEST Premium</Text>
                  <Text style={styles.fundType}>Fundo de Ações</Text>
                </View>
                <Text style={styles.fundReturn}>+15.2%</Text>
              </View>
            </View>

            <View style={styles.fundCard}>
              <View style={styles.fundHeader}>
                <View style={styles.fundIcon}>
                  <Ionicons name="trending-up" size={24} color="#10B981" />
                </View>
                <View style={styles.fundInfo}>
                  <Text style={styles.fundName}>KIMINVEST Renda Fixa</Text>
                  <Text style={styles.fundType}>Fundo de Renda Fixa</Text>
                </View>
                <Text style={styles.fundReturn}>+8.7%</Text>
              </View>
            </View>
          </ScrollView>
        )

      case "Historico":
        return (
          <ScrollView style={styles.centerContent} showsVerticalScrollIndicator={false}>
            <View style={styles.historicoHeader}>
              <Ionicons name="time" size={32} color="#AAAAAA" />
              <Text style={styles.sectionTitle}>Histórico</Text>
              <Text style={styles.sectionSubtitle}>Suas transações recentes</Text>
            </View>

            <View style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <Ionicons name="add" size={20} color="#10B981" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>Investimento</Text>
                <Text style={styles.transactionDate}>Hoje, 14:30</Text>
              </View>
              <Text style={styles.transactionAmount}>+R$ 500,00</Text>
            </View>

            <View style={styles.transactionCard}>
              <View style={styles.transactionIcon}>
                <Ionicons name="trending-up" size={20} color="#FFFFFF" />
              </View>
              <View style={styles.transactionInfo}>
                <Text style={styles.transactionTitle}>Rendimento</Text>
                <Text style={styles.transactionDate}>Ontem, 09:00</Text>
              </View>
              <Text style={styles.transactionAmount}>+R$ 12,35</Text>
            </View>
          </ScrollView>
        )

      default:
        return null
    }
  }

  return (
    <View style={styles.container}>
      {/* Top Bar with Gradient */}
      <LinearGradient colors={["#000000", "#000000"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.topBar}>
        <Text style={styles.logo}>KIMINVEST</Text>
        <View style={styles.logoSubtext}>
          <Ionicons name="diamond" size={16} color="#FFFFFF" />
          <Text style={styles.logoTagline}>Invista com inteligência</Text>
        </View>
      </LinearGradient>

      {renderTabContent()}

      {/* Enhanced Bottom Navigation */}
      <LinearGradient
        colors={["#000000", "#000000"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bottomMenu}
      >
        <TouchableOpacity
          style={[styles.menuItem, activeTab === "Inicio" && styles.activeMenuItem]}
          onPress={() => setActiveTab("Inicio")}
        >
          <Ionicons
            name={activeTab === "Inicio" ? "home" : "home-outline"}
            size={24}
            color={activeTab === "Inicio" ? "#FFFFFF" : "#AAAAAA"}
          />
          <Text style={[styles.menuText, activeTab === "Inicio" && styles.activeMenuText]}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, activeTab === "Calculadora" && styles.activeMenuItem]}
          onPress={() => setActiveTab("Calculadora")}
        >
          <Ionicons
            name={activeTab === "Calculadora" ? "calculator" : "calculator-outline"}
            size={24}
            color={activeTab === "Calculadora" ? "#FFFFFF" : "#AAAAAA"}
          />
          <Text style={[styles.menuText, activeTab === "Calculadora" && styles.activeMenuText]}>Calculadora</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, activeTab === "EmAlta" && styles.activeMenuItem]}
          onPress={() => setActiveTab("EmAlta")}
        >
          <Ionicons
            name={activeTab === "EmAlta" ? "flame" : "flame-outline"}
            size={24}
            color={activeTab === "EmAlta" ? "#FFFFFF" : "#AAAAAA"}
          />
          <Text style={[styles.menuText, activeTab === "EmAlta" && styles.activeMenuText]}>Em Alta</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.menuItem, activeTab === "Historico" && styles.activeMenuItem]}
          onPress={() => setActiveTab("Historico")}
        >
          <Ionicons
            name={activeTab === "Historico" ? "time" : "time-outline"}
            size={24}
            color={activeTab === "Historico" ? "#FFFFFF" : "#AAAAAA"}
          />
          <Text style={[styles.menuText, activeTab === "Historico" && styles.activeMenuText]}>Histórico</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  topBar: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  logo: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
    letterSpacing: 1.5,
  },
  logoSubtext: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  logoTagline: {
    color: "#AAAAAA",
    fontSize: 12,
    marginLeft: 4,
  },
  body: {
    flex: 1,
    backgroundColor: "#000000",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  greetingContainer: {
    flex: 1,
  },
  greeting: {
    fontSize: 16,
    color: "#AAAAAA",
    marginBottom: 2,
  },
  username: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  balanceCard: {
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 8,
  },
  balanceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  balanceLabel: {
    color: "#AAAAAA",
    fontSize: 16,
    fontWeight: "500",
  },
  balance: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 12,
  },
  balanceFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  changeIndicator: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    color: "#10B981",
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  actionButton: {
    alignItems: "center",
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#1C1C1C",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  actionText: {
    fontSize: 12,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  chartCard: {
    backgroundColor: "#1C1C1C",
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  chartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  chartPeriod: {
    backgroundColor: "#333333",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  periodText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#AAAAAA",
  },
  legend: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: "#AAAAAA",
    fontWeight: "500",
  },
  calculatorContainer: {
    padding: 20,
    paddingBottom: 120,
  },
  calculatorHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  calculatorTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 4,
  },
  calculatorSubtitle: {
    fontSize: 16,
    color: "#AAAAAA",
  },
  inputCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333333",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#444444",
    paddingHorizontal: 16,
  },
  currencySymbol: {
    fontSize: 16,
    color: "#AAAAAA",
    marginRight: 8,
    fontWeight: "500",
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: "#FFFFFF",
  },
  inputRow: {
    flexDirection: "row",
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333333",
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
  },
  switchInfo: {
    flex: 1,
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  switchDescription: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  calculateButton: {
    marginBottom: 20,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  buttonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
  },
  resultCard: {
    backgroundColor: "#1C1C1C",
    padding: 24,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#10B981",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  resultHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginLeft: 8,
  },
  resultValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#10B981",
    marginBottom: 8,
  },
  resultDescription: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  centerContent: {
    flex: 1,
    backgroundColor: "#000000",
    padding: 20,
  },
  emAltaHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  historicoHeader: {
    alignItems: "center",
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginTop: 12,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 16,
    color: "#AAAAAA",
  },
  fundCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 5,
  },
  fundHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  fundIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  fundInfo: {
    flex: 1,
  },
  fundName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  fundType: {
    fontSize: 14,
    color: "#AAAAAA",
  },
  fundReturn: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#10B981",
  },
  transactionCard: {
    backgroundColor: "#1C1C1C",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 3,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#333333",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  transactionInfo: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 12,
    color: "#AAAAAA",
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#10B981",
  },
  bottomMenu: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  menuItem: {
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  activeMenuItem: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  menuText: {
    color: "#AAAAAA",
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  activeMenuText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
})
