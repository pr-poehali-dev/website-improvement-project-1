import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
}

const menuItems: MenuItem[] = [
  { id: '1', name: 'Канапе с лососем', category: 'Закуски', price: 350, description: 'Изысканные канапе на ржаном хлебе' },
  { id: '2', name: 'Мини-тарталетки', category: 'Закуски', price: 280, description: 'С различными начинками' },
  { id: '3', name: 'Брускетта', category: 'Закуски', price: 320, description: 'С томатами и моцареллой' },
  { id: '4', name: 'Филе-миньон', category: 'Горячее', price: 850, description: 'Нежная говядина с овощами' },
  { id: '5', name: 'Куриное филе', category: 'Горячее', price: 650, description: 'В сливочном соусе' },
  { id: '6', name: 'Лосось на гриле', category: 'Горячее', price: 950, description: 'С лимонным маслом' },
  { id: '7', name: 'Цезарь', category: 'Салаты', price: 420, description: 'Классический салат с курицей' },
  { id: '8', name: 'Греческий', category: 'Салаты', price: 380, description: 'Со свежими овощами и фетой' },
  { id: '9', name: 'Тирамису', category: 'Десерты', price: 380, description: 'Итальянский десерт' },
  { id: '10', name: 'Чизкейк', category: 'Десерты', price: 350, description: 'Нежный творожный десерт' },
];

const services = [
  { icon: 'Utensils', title: 'Кейтеринг', description: 'Организация питания на мероприятиях любого масштаба' },
  { icon: 'Briefcase', title: 'Корпоративное питание', description: 'Ежедневные бизнес-ланчи для вашего офиса' },
  { icon: 'Users', title: 'Банкеты', description: 'Праздничное меню для торжественных событий' },
  { icon: 'Coffee', title: 'Кофе-брейки', description: 'Организация перерывов на конференциях' },
];

const galleryImages = [
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/43193a64-bebf-4d71-a40b-8cf488ef792f.jpg', alt: 'Канапе с лососем' },
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/c122a797-6f2b-41b8-ad03-fa4965904b23.jpg', alt: 'Лосось на гриле' },
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/614188d9-0860-4ea4-8c28-09fde6d2a6b2.jpg', alt: 'Тирамису' },
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/43193a64-bebf-4d71-a40b-8cf488ef792f.jpg', alt: 'Изысканные закуски' },
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/c122a797-6f2b-41b8-ad03-fa4965904b23.jpg', alt: 'Горячие блюда' },
  { url: 'https://cdn.poehali.dev/projects/04c06ea1-30cf-43c7-a915-931a5edc5e53/files/614188d9-0860-4ea4-8c28-09fde6d2a6b2.jpg', alt: 'Десерты' },
];

export default function Index() {
  const [selectedItems, setSelectedItems] = useState<{ [key: string]: number }>({});
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToOrder = (item: MenuItem) => {
    setSelectedItems(prev => ({
      ...prev,
      [item.id]: (prev[item.id] || 0) + 1
    }));
  };

  const removeFromOrder = (itemId: string) => {
    setSelectedItems(prev => {
      const newItems = { ...prev };
      if (newItems[itemId] > 1) {
        newItems[itemId]--;
      } else {
        delete newItems[itemId];
      }
      return newItems;
    });
  };

  const totalPrice = Object.entries(selectedItems).reduce((sum, [id, quantity]) => {
    const item = menuItems.find(i => i.id === id);
    return sum + (item ? item.price * quantity : 0);
  }, 0);

  const totalItems = Object.values(selectedItems).reduce((sum, qty) => sum + qty, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      <nav className="sticky top-0 z-50 backdrop-blur-lg bg-background/80 border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src="https://cdn.poehali.dev/files/2ffdb5c8-41d9-45bc-8bd1-886b76e75c7c.png" alt="Каравелла" className="h-12 md:h-14" />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-bold text-primary">ООО «Каравелла»</span>
                <span className="text-xs md:text-sm text-muted-foreground">Фабрика-Кухня № 1</span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-6">
              {['home', 'about', 'services', 'menu', 'gallery', 'contacts'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm font-medium transition-all hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'about' && 'О нас'}
                  {section === 'services' && 'Услуги'}
                  {section === 'menu' && 'Меню'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
            </div>
            <Button className="animate-scale-in">
              <Icon name="Phone" className="mr-2 h-4 w-4" />
              Позвонить
            </Button>
          </div>
        </div>
      </nav>

      <section id="home" className="relative py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-6 text-lg px-4 py-2 bg-primary text-primary-foreground">
              Кейтеринг в Дубне
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Вкус, который объединяет
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Профессиональное кейтеринговое обслуживание для мероприятий любого формата
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button size="lg" className="text-lg px-8 py-6" onClick={() => scrollToSection('menu')}>
                <Icon name="ChefHat" className="mr-2 h-5 w-5" />
                Составить меню
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6" onClick={() => scrollToSection('contacts')}>
                <Icon name="Mail" className="mr-2 h-5 w-5" />
                Связаться с нами
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
              О нас
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              ООО «Каравелла» Фабрика-Кухня № 1 — это команда профессионалов с многолетним опытом в сфере кейтеринга и организации питания. 
              Мы создаем незабываемые кулинарные впечатления для ваших мероприятий.
            </p>
            <p className="text-lg text-muted-foreground">
              Наша миссия — сделать каждое событие особенным через качественную еду, безупречный сервис и внимание к деталям.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
              {[
                { number: '500+', label: 'Мероприятий' },
                { number: '10+', label: 'Лет опыта' },
                { number: '50+', label: 'Блюд в меню' },
                { number: '100%', label: 'Довольных клиентов' },
              ].map((stat, index) => (
                <div key={index} className="text-center animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Наши услуги
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <Card key={index} className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 hover:border-primary animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4">
                    <Icon name={service.icon as any} className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Конструктор меню
          </h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Составьте индивидуальное меню для вашего мероприятия
          </p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            <div className="lg:col-span-2">
              <Tabs defaultValue="Закуски" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-8">
                  <TabsTrigger value="Закуски">Закуски</TabsTrigger>
                  <TabsTrigger value="Горячее">Горячее</TabsTrigger>
                  <TabsTrigger value="Салаты">Салаты</TabsTrigger>
                  <TabsTrigger value="Десерты">Десерты</TabsTrigger>
                </TabsList>
                
                {['Закуски', 'Горячее', 'Салаты', 'Десерты'].map(category => (
                  <TabsContent key={category} value={category} className="space-y-4">
                    {menuItems.filter(item => item.category === category).map(item => (
                      <Card key={item.id} className="hover:shadow-lg transition-all duration-300">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-2">
                            <div className="flex-1">
                              <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
                              <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
                              <p className="text-xl font-bold text-primary">{item.price} ₽</p>
                            </div>
                            <Button onClick={() => addToOrder(item)} className="ml-4">
                              <Icon name="Plus" className="h-4 w-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-2 border-primary/20">
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Icon name="ShoppingCart" className="h-6 w-6 text-primary" />
                    Ваш заказ
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {totalItems === 0 ? (
                    <p className="text-muted-foreground text-center py-8">Ваш заказ пуст</p>
                  ) : (
                    <div className="space-y-4">
                      {Object.entries(selectedItems).map(([id, quantity]) => {
                        const item = menuItems.find(i => i.id === id);
                        if (!item) return null;
                        return (
                          <div key={id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                            <div className="flex-1">
                              <p className="font-medium text-sm">{item.name}</p>
                              <p className="text-xs text-muted-foreground">{item.price} ₽</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Button size="sm" variant="outline" onClick={() => removeFromOrder(id)}>
                                <Icon name="Minus" className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center font-semibold">{quantity}</span>
                              <Button size="sm" variant="outline" onClick={() => addToOrder(item)}>
                                <Icon name="Plus" className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                      <Separator className="my-4" />
                      <div className="flex justify-between items-center text-xl font-bold">
                        <span>Итого:</span>
                        <span className="text-primary">{totalPrice.toLocaleString()} ₽</span>
                      </div>
                      <Button className="w-full mt-4" size="lg">
                        <Icon name="Send" className="mr-2 h-4 w-4" />
                        Отправить заказ
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
            Галерея
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={index} 
                className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <p className="text-white font-semibold">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="vacancies" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Вакансии
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Мы всегда рады талантливым специалистам в нашей команде!
            </p>
            <div className="space-y-4">
              {[
                { title: 'Повар', level: 'Опыт от 2 лет' },
                { title: 'Официант', level: 'Опыт от 1 года' },
                { title: 'Менеджер по работе с клиентами', level: 'Опыт от 3 лет' },
              ].map((vacancy, index) => (
                <Card key={index} className="text-left hover:shadow-lg transition-all duration-300 hover:border-primary">
                  <CardContent className="p-6 flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-semibold mb-1">{vacancy.title}</h3>
                      <p className="text-muted-foreground">{vacancy.level}</p>
                    </div>
                    <Button>
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Откликнуться
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
            Контакты
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
            <div className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="MapPin" className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Адрес</h3>
                    <p className="text-muted-foreground">г. Дубна, ул. Примерная, 1</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Phone" className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Телефон</h3>
                    <p className="text-muted-foreground">+7 (999) 123-45-67</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Mail" className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                    <p className="text-muted-foreground">info@karavel-dubna.ru</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon name="Clock" className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">Режим работы</h3>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 21:00</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-2 border-primary/20">
              <CardHeader>
                <CardTitle className="text-2xl">Связаться с нами</CardTitle>
                <CardDescription>Оставьте заявку и мы свяжемся с вами в ближайшее время</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Имя</label>
                  <input type="text" placeholder="Ваше имя" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Телефон</label>
                  <input type="tel" placeholder="+7 (999) 123-45-67" className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сообщение</label>
                  <textarea placeholder="Расскажите о вашем мероприятии" rows={4} className="w-full px-4 py-2 border border-input rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
                </div>
                <Button className="w-full" size="lg">
                  <Icon name="Send" className="mr-2 h-4 w-4" />
                  Отправить заявку
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="bg-muted/50 border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground">© 2024 ООО «Каравелла» Фабрика-Кухня № 1. Все права защищены.</p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Mail'].map((social) => (
                <Button key={social} size="icon" variant="ghost" className="hover:bg-primary/10 hover:text-primary">
                  <Icon name={social as any} className="h-5 w-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}